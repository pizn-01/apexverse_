
import { config } from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';

const streamPipeline = promisify(pipeline);

// Load environment variables from the root .env file
config({ path: resolve(process.cwd(), '.env') });

const { Pool } = pg;

async function fixImages() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('❌ DATABASE_URL not found');
        process.exit(1);
    }

    const pool = new Pool({ connectionString });
    const client = await pool.connect();
    const publicDir = resolve(process.cwd(), 'client/public/testimonials');

    try {
        console.log('🔧 Starting image fix...');

        // Ensure directory exists
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // unexpected: fetch all instagram testimonials
        const res = await client.query("SELECT id, post_url, author_name FROM testimonials WHERE platform = 'instagram'");
        const testimonials = res.rows;
        console.log(`Found ${testimonials.length} Instagram testimonials to process.`);

        let updatedCount = 0;

        for (const t of testimonials) {
            let postUrl = t.post_url;
            // ensure trailing slash is handled for the append, but actually, instagram urls usually end with /
            // safer to URL object
            // Actually the trick is just appending 'media/?size=l'
            // If postUrl is https://www.instagram.com/p/CODE/ then 'media/?size=l' is relative? No.
            // https://www.instagram.com/p/CODE/media/?size=l is the valid URL.

            let downloadUrl = postUrl;
            if (!downloadUrl.endsWith('/')) downloadUrl += '/';
            downloadUrl += 'media/?size=l';

            const filename = `${t.author_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${t.id.substring(0, 8)}.jpg`;
            const localPath = path.join(publicDir, filename);
            const dbPath = `/testimonials/${filename}`;

            console.log(`Processing ${t.author_name}...`);

            try {
                const response = await fetch(downloadUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                });

                if (!response.ok) {
                    console.error(`  ❌ HTTP error: ${response.status} for ${downloadUrl}`);
                    continue;
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('image')) {
                    const fileStream = fs.createWriteStream(localPath);
                    if (response.body) {
                        // @ts-ignore
                        await streamPipeline(response.body, fileStream);

                        // Update DB
                        await client.query('UPDATE testimonials SET image_url = $1 WHERE id = $2', [dbPath, t.id]);
                        console.log(`  ✅ Downloaded & Updated: ${dbPath}`);
                        updatedCount++;
                    }
                } else {
                    console.error(`  ❌ Not an image content-type: ${contentType}`);
                }

            } catch (error: any) {
                console.error(`  ❌ Error downloading: ${error.message}`);
            }
        }

        console.log(`\n🎉 Finished! Updated ${updatedCount}/${testimonials.length} images.`);

    } catch (error: any) {
        console.error('❌ Fatal error:', error.message);
    } finally {
        client.release();
        pool.end();
    }
}

fixImages();
