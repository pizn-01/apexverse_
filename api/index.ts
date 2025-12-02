import app from '../server/index';

// Wrap with error handling for Vercel serverless
export default async function handler(req: any, res: any) {
    try {
        console.log(`[API] ${req.method} ${req.url}`);
        return await app(req, res);
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
