// Vercel serverless API handler
// Simplified approach: handle routes directly without Express initialization issues

import { storage } from '../server/storage';
import { insertTestimonialSchema } from '../shared/schema';
import { fromError } from 'zod-validation-error';

export default async function handler(req: any, res: any) {
    try {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle preflight
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const pathname = url.pathname;

        console.log(`[API] ${req.method} ${pathname}`);

        // Route: GET /api/testimonials
        if (pathname === '/api/testimonials' && req.method === 'GET') {
            const testimonials = await storage.getTestimonials();
            console.log(`[API] Fetched ${testimonials.length} testimonials`);
            return res.status(200).json(testimonials);
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

            const testimonial = await storage.createTestimonial(validationResult.data);
            console.log(`[API] Created testimonial: ${testimonial.authorName}`);
            return res.status(201).json(testimonial);
        }

        // Route: DELETE /api/testimonials/:id
        if (pathname.startsWith('/api/testimonials/') && req.method === 'DELETE') {
            const id = pathname.split('/').pop();
            if (!id) {
                return res.status(400).json({ error: 'Testimonial ID required' });
            }

            const deleted = await storage.deleteTestimonial(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Testimonial not found' });
            }

            console.log(`[API] Deleted testimonial: ${id}`);
            return res.status(200).json({ message: 'Testimonial deleted successfully' });
        }

        // Route: GET /api/health
        if (pathname === '/api/health' && req.method === 'GET') {
            const testimonials = await storage.getTestimonials();
            return res.status(200).json({
                status: 'healthy',
                database: 'connected',
                testimonialCount: testimonials.length,
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

