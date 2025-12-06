// Self-contained API entry point for Vercel serverless
// This file initializes the Express app directly without importing from server/index
// to avoid module resolution issues in Vercel's serverless environment

import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

// Middleware setup
app.use(express.json({
    verify: (req: any, _res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }

            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }

            console.log(logLine);
        }
    });

    next();
});

// Initialize routes once
let initialized = false;
let initPromise: Promise<void> | null = null;

async function initializeApp() {
    if (!initialized && !initPromise) {
        initPromise = (async () => {
            try {
                // registerRoutes returns a Server, but we only need it for the side effect
                // of registering routes on the app. We don't use the server in serverless.
                await registerRoutes(app);
                initialized = true;
                console.log('✅ API routes initialized for Vercel serverless');
            } catch (error) {
                console.error('❌ Failed to initialize API routes:', error);
                initPromise = null; // Reset to allow retry
                throw error;
            }
        })();
    }
    await initPromise;
}

// Vercel serverless handler
export default async function handler(req: any, res: any) {
    try {
        // Initialize app on first request (cold start)
        await initializeApp();

        // Call Express app as a request handler
        // Express apps are functions that accept (req, res, next)
        // In serverless, we don't have 'next', so we wrap it
        return new Promise((resolve, reject) => {
            res.on('finish', resolve);
            res.on('error', reject);
            app(req, res, (err: any) => {
                if (err) reject(err);
            });
        });
    } catch (error: any) {
        console.error('[API Error]:', error);
        console.error('[API Error Stack]:', error.stack);

        // Return error response if not already sent
        if (!res.headersSent) {
            return res.status(500).json({
                error: 'Internal server error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
}

