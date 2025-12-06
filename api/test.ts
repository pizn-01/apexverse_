// Minimal test endpoint to verify Vercel serverless function works
// This bypasses all Express setup to isolate the issue

export default async function handler(req: any, res: any) {
    try {
        console.log('[TEST] Minimal handler invoked');
        console.log('[TEST] Method:', req.method);
        console.log('[TEST] URL:', req.url);

        // Test database connection
        const dbUrl = process.env.DATABASE_URL;
        console.log('[TEST] DATABASE_URL exists:', !!dbUrl);

        return res.status(200).json({
            status: 'ok',
            message: 'Minimal handler working',
            timestamp: new Date().toISOString(),
            env: {
                hasDatabase: !!dbUrl,
                nodeEnv: process.env.NODE_ENV
            }
        });
    } catch (error: any) {
        console.error('[TEST ERROR]:', error);
        return res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
