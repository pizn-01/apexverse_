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

type Testimonial = typeof testimonials.$inferSelect;
type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

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

// ============================================================================
// VERCEL SERVERLESS HANDLER
// ============================================================================

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
