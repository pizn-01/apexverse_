
import { config } from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';
import fs from 'fs/promises';

// Load environment variables from the root .env file
config({ path: resolve(process.cwd(), '.env') });

const { Pool } = pg;

interface Testimonial {
    platform: 'instagram' | 'twitter' | 'x';
    postUrl: string;
    authorName: string;
    authorHandle?: string;
    content: string;
    imageUrl?: string;
}

async function seedTestimonials() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('❌ DATABASE_URL not found in environment variables');
        process.exit(1);
    }

    const pool = new Pool({ connectionString });
    const client = await pool.connect();

    try {
        console.log('🌱 Starting testimonial seeding...');

        // Read data from JSON file
        const dataPath = resolve(process.cwd(), 'scripts/testimonials_data.json');
        let testimonials: Testimonial[] = [];

        try {
            const fileContent = await fs.readFile(dataPath, 'utf-8');
            testimonials = JSON.parse(fileContent);
            console.log(`📖 Loaded ${testimonials.length} testimonials from ${dataPath}`);
        } catch (error) {
            console.error(`❌ Failed to read data file at ${dataPath}. Make sure it exists.`);
            process.exit(1);
        }

        let successCount = 0;
        let failCount = 0;

        for (const testimonial of testimonials) {
            try {
                // Check if exists
                const checkRes = await client.query(
                    'SELECT id FROM testimonials WHERE post_url = $1',
                    [testimonial.postUrl]
                );

                if (checkRes.rows.length > 0) {
                    console.log(`⚠️  Skipping existing: ${testimonial.authorName} (${testimonial.postUrl})`);
                    continue;
                }

                // Insert
                await client.query(`
          INSERT INTO testimonials (platform, post_url, author_name, author_handle, content, image_url, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW())
        `, [
                    testimonial.platform,
                    testimonial.postUrl,
                    testimonial.authorName,
                    testimonial.authorHandle || '',
                    testimonial.content,
                    testimonial.imageUrl || null
                ]);

                console.log(`✅ Added: ${testimonial.authorName}`);
                successCount++;
            } catch (err: any) {
                console.error(`❌ Failed to add ${testimonial.authorName}: ${err.message}`);
                failCount++;
            }
        }

        console.log(`\n🎉 Seeding complete! Added: ${successCount}, Skipped/Failed: ${failCount}, Total Processed: ${testimonials.length}`);

    } catch (error: any) {
        console.error('❌ Fatal error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

seedTestimonials();
