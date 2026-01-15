// Standalone Vercel Serverless API Handler
// All dependencies inlined to avoid module resolution issues

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg;
import { desc, eq, sql } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import multer from 'multer';

// Middleware helper for Vercel
function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// Configure Multer for Memory Storage (Serverless compatible)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// ============================================================================
// SCHEMA DEFINITIONS (inlined from shared/schema.ts)
// ============================================================================

const testimonials = pgTable("testimonials", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    platform: text("platform").notNull(),
    postUrl: text("post_url").notNull(),
    authorName: text("author_name").notNull(),
    authorHandle: text("author_handle"),
    content: text("content").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertTestimonialSchema = createInsertSchema(testimonials).pick({
    platform: true,
    postUrl: true,
    authorName: true,
    authorHandle: true,
    content: true,
    imageUrl: true,
}).extend({
    platform: z.enum(['instagram', 'x'], {
        errorMap: () => ({ message: "Platform must be 'instagram' or 'x'" })
    }),
    postUrl: z.string().url("Please enter a valid URL"),
    authorName: z.string().min(1, "Author name is required"),
    content: z.string().min(1, "Content is required"),
});

const portfolioItems = pgTable("portfolio_items", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    category: text("category").notNull(),
    lineArtUrl: text("line_art_url").notNull(),
    fullArtUrl: text("full_art_url").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertPortfolioItemSchema = createInsertSchema(portfolioItems).pick({
    title: true,
    category: true,
    lineArtUrl: true,
    fullArtUrl: true,
    description: true,
}).extend({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    lineArtUrl: z.string().min(1, "Line art URL is required"),
    fullArtUrl: z.string().min(1, "Full art URL is required"),
    description: z.string().optional(),
});

type Testimonial = typeof testimonials.$inferSelect;
type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
type PortfolioItem = typeof portfolioItems.$inferSelect;
type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

// ============================================================================
// DATABASE CONNECTION (inlined from server/storage.ts)
// ============================================================================

let db: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
    if (!db) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        const pool = new Pool({
            connectionString,
            max: 1, // Limit connections in serverless
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        });

        db = drizzle(pool);
        console.log('✅ Database connection initialized');
    }
    return db;
}

// ============================================================================
// STORAGE METHODS (inlined from server/storage.ts)
// ============================================================================

async function getTestimonials(): Promise<Testimonial[]> {
    const database = getDatabase();
    return await database
        .select()
        .from(testimonials)
        .orderBy(desc(testimonials.createdAt));
}

async function createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const database = getDatabase();
    const [testimonial] = await database
        .insert(testimonials)
        .values({
            platform: insertTestimonial.platform,
            postUrl: insertTestimonial.postUrl,
            authorName: insertTestimonial.authorName,
            authorHandle: insertTestimonial.authorHandle ?? null,
            content: insertTestimonial.content,
            imageUrl: insertTestimonial.imageUrl ?? null,
        })
        .returning();
    return testimonial;
}

async function deleteTestimonial(id: string): Promise<boolean> {
    const database = getDatabase();
    const result = await database
        .delete(testimonials)
        .where(eq(testimonials.id, id))
        .returning();
    return result.length > 0;
}

async function getPortfolioItems(): Promise<PortfolioItem[]> {
    const database = getDatabase();
    return await database
        .select()
        .from(portfolioItems)
        .orderBy(desc(portfolioItems.createdAt));
}

async function createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const database = getDatabase();
    const [item] = await database
        .insert(portfolioItems)
        .values({
            title: insertItem.title,
            category: insertItem.category,
            lineArtUrl: insertItem.lineArtUrl,
            fullArtUrl: insertItem.fullArtUrl,
            description: insertItem.description ?? null,
        })
        .returning();
    return item;
}

async function deletePortfolioItem(id: string): Promise<boolean> {
    const database = getDatabase();
    const result = await database
        .delete(portfolioItems)
        .where(eq(portfolioItems.id, id))
        .returning();
    return result.length > 0;
}

// ============================================================================
// VERCEL SERVERLESS HANDLER
// ============================================================================

export default async function handler(req: any, res: any) {
    try {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Handle preflight
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Get pathname from Vercel request - req.url contains the path
        const pathname = req.url || '/api';

        console.log(`[API] ${req.method} ${pathname}`);

        // ------------------------------------------------------------------------
        // MIGRATION ROUTE (ONE-TIME USE)
        // ------------------------------------------------------------------------

        // Route: POST /api/migrate (Creates portfolio_items table if it doesn't exist)
        if (pathname === '/api/migrate' && req.method === 'POST') {
            try {
                const database = getDatabase();
                await database.execute(sql`
                    CREATE TABLE IF NOT EXISTS portfolio_items (
                        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
                        title TEXT NOT NULL,
                        category TEXT NOT NULL,
                        line_art_url TEXT NOT NULL,
                        full_art_url TEXT NOT NULL,
                        description TEXT,
                        created_at TIMESTAMP DEFAULT NOW() NOT NULL
                    );
                `);
                console.log('[API] Portfolio table created/verified');
                return res.status(200).json({
                    success: true,
                    message: 'Portfolio table created successfully'
                });
            } catch (error: any) {
                console.error('[API] Migration error:', error);
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }

        // ------------------------------------------------------------------------
        // PORTFOLIO ROUTES
        // ------------------------------------------------------------------------

        // Route: GET /api/portfolio
        if (pathname === '/api/portfolio' && req.method === 'GET') {
            const items = await getPortfolioItems();
            console.log(`[API] Fetched ${items.length} portfolio items`);
            return res.status(200).json(items);
        }

        // Route: POST /api/portfolio
        if (pathname === '/api/portfolio' && req.method === 'POST') {
            const validationResult = insertPortfolioItemSchema.safeParse(req.body);

            if (!validationResult.success) {
                const validationError = fromError(validationResult.error);
                return res.status(400).json({
                    error: validationError.toString()
                });
            }

            const item = await createPortfolioItem(validationResult.data);
            console.log(`[API] Created portfolio item: ${item.title}`);
            return res.status(201).json(item);
        }

        // Route: DELETE /api/portfolio/:id
        if (pathname.startsWith('/api/portfolio/') && req.method === 'DELETE') {
            const id = pathname.split('/').pop();
            if (!id) {
                return res.status(400).json({ error: 'Portfolio ID required' });
            }

            const deleted = await deletePortfolioItem(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Portfolio item not found' });
            }

            console.log(`[API] Deleted portfolio item: ${id}`);
            return res.status(200).json({ message: 'Portfolio item deleted successfully' });
        }

        // Route: POST /api/upload/portfolio (Handle File Uploads)
        if (pathname === '/api/upload/portfolio' && req.method === 'POST') {
            // Run Multer middleware
            await runMiddleware(req, res, upload.fields([
                { name: 'lineArt', maxCount: 1 },
                { name: 'fullArt', maxCount: 1 }
            ]));

            const files = (req as any).files;

            if (!files || !files.lineArt || !files.fullArt) {
                return res.status(400).json({
                    error: "Both line art and full art images are required"
                });
            }

            // Convert Buffers to Base64 Data URIs
            const lineArtBuffer = files.lineArt[0].buffer;
            const lineArtMime = files.lineArt[0].mimetype;
            const lineArtBase64 = `data:${lineArtMime};base64,${lineArtBuffer.toString('base64')}`;

            const fullArtBuffer = files.fullArt[0].buffer;
            const fullArtMime = files.fullArt[0].mimetype;
            const fullArtBase64 = `data:${fullArtMime};base64,${fullArtBuffer.toString('base64')}`;

            console.log("✅ Portfolio images uploaded (converted to Base64)");

            return res.status(200).json({
                lineArtUrl: lineArtBase64,
                fullArtUrl: fullArtBase64
            });
        }

        // ------------------------------------------------------------------------
        // TESTIMONIAL ROUTES
        // ------------------------------------------------------------------------

        // Route: GET /api/testimonials
        if (pathname === '/api/testimonials' && req.method === 'GET') {
            const testimonialsList = await getTestimonials();
            console.log(`[API] Fetched ${testimonialsList.length} testimonials`);
            return res.status(200).json(testimonialsList);
        }

        // Route: POST /api/testimonials
        if (pathname === '/api/testimonials' && req.method === 'POST') {
            const validationResult = insertTestimonialSchema.safeParse(req.body);

            if (!validationResult.success) {
                const validationError = fromError(validationResult.error);
                return res.status(400).json({
                    error: validationError.toString()
                });
            }

            const testimonial = await createTestimonial(validationResult.data);
            console.log(`[API] Created testimonial: ${testimonial.authorName}`);
            return res.status(201).json(testimonial);
        }

        // Route: DELETE /api/testimonials/:id
        if (pathname.startsWith('/api/testimonials/') && req.method === 'DELETE') {
            const id = pathname.split('/').pop();
            if (!id) {
                return res.status(400).json({ error: 'Testimonial ID required' });
            }

            const deleted = await deleteTestimonial(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Testimonial not found' });
            }

            console.log(`[API] Deleted testimonial: ${id}`);
            return res.status(200).json({ message: 'Testimonial deleted successfully' });
        }

        // Route: POST /api/upload/testimonial
        if (pathname === '/api/upload/testimonial' && req.method === 'POST') {
            // Run Multer middleware
            await runMiddleware(req, res, upload.single('image'));

            const file = (req as any).file;

            if (!file) {
                return res.status(400).json({
                    error: "Image file is required"
                });
            }

            // Convert Buffer to Base64 Data URI
            const imageBuffer = file.buffer;
            const imageMime = file.mimetype;
            const imageBase64 = `data:${imageMime};base64,${imageBuffer.toString('base64')}`;

            console.log("✅ Testimonial image uploaded (converted to Base64)");

            return res.status(200).json({
                imageUrl: imageBase64
            });
        }


        // Route: GET /api/health
        if (pathname === '/api/health' && req.method === 'GET') {
            const testimonialsList = await getTestimonials();
            return res.status(200).json({
                status: 'healthy',
                database: 'connected',
                testimonialCount: testimonialsList.length,
                timestamp: new Date().toISOString()
            });
        }

        // Route not found
        return res.status(404).json({
            error: 'Not found',
            path: pathname,
            method: req.method
        });

    } catch (error: any) {
        console.error('[API Error]:', error);
        console.error('[API Error Stack]:', error.stack);

        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
