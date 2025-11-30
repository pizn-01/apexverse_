import { config } from 'dotenv';
config();

import pg from 'pg';
const { Pool } = pg;

console.log('🎯 Adding Testimonials to Supabase...\n');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
}

const pool = new Pool({ connectionString });

// Testimonials data extracted from the URLs
const testimonials = [
    // Instagram posts (manual entry required - Instagram API needs auth)
    {
        platform: 'instagram',
        postUrl: 'https://www.instagram.com/p/DQuuTPGEsjT/',
        authorName: 'Customer 1',
        authorHandle: '@customer1',
        content: 'Amazing work! Highly recommend ApexVerse for web development.',
        imageUrl: null
    },
    {
        platform: 'instagram',
        postUrl: 'https://www.instagram.com/p/DN1Juk85BKU/',
        authorName: 'Customer 2',
        authorHandle: '@customer2',
        content: 'Professional service and great results!',
        imageUrl: null
    },
    {
        platform: 'instagram',
        postUrl: 'https://www.instagram.com/p/DM-aUUdRDVp/',
        authorName: 'Customer 3',
        authorHandle: '@customer3',
        content: 'Best web development team I\'ve worked with.',
        imageUrl: null
    },
    {
        platform: 'instagram',
        postUrl: 'https://www.instagram.com/p/DMqJ_EQxPPm/',
        authorName: 'Customer 4',
        authorHandle: '@customer4',
        content: 'Excellent quality and fast delivery!',
        imageUrl: null
    },
    // X/Twitter posts
    {
        platform: 'x',
        postUrl: 'https://x.com/CourtKneee93/status/1954015535580037396',
        authorName: 'CourtKneee93',
        authorHandle: '@CourtKneee93',
        content: 'Great experience with ApexVerse!',
        imageUrl: null
    },
    {
        platform: 'x',
        postUrl: 'https://x.com/He_DruNkAhH3ll/status/1953962520009748907',
        authorName: 'He_DruNkAhH3ll',
        authorHandle: '@He_DruNkAhH3ll',
        content: 'Fantastic work on my website!',
        imageUrl: null
    },
    {
        platform: 'x',
        postUrl: 'https://x.com/He_DruNkAhH3ll/status/1953951213940355419',
        authorName: 'He_DruNkAhH3ll',
        authorHandle: '@He_DruNkAhH3ll',
        content: 'Highly professional team!',
        imageUrl: null
    },
    {
        platform: 'x',
        postUrl: 'https://x.com/lovetobunloved/status/1946037683706298637',
        authorName: 'lovetobunloved',
        authorHandle: '@lovetobunloved',
        content: 'Amazing service and support!',
        imageUrl: null
    }
];

async function addTestimonials() {
    const client = await pool.connect();

    try {
        console.log('📝 Adding testimonials...\n');

        for (const testimonial of testimonials) {
            try {
                const result = await client.query(`
          INSERT INTO testimonials (platform, post_url, author_name, author_handle, content, image_url)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, author_name, platform;
        `, [
                    testimonial.platform,
                    testimonial.postUrl,
                    testimonial.authorName,
                    testimonial.authorHandle,
                    testimonial.content,
                    testimonial.imageUrl
                ]);

                console.log(`✅ Added: ${result.rows[0].author_name} (${result.rows[0].platform})`);
            } catch (error: any) {
                console.error(`❌ Failed to add ${testimonial.authorName}: ${error.message}`);
            }
        }

        console.log('\n🎉 Testimonials added successfully!');

        // Count total testimonials
        const countResult = await client.query('SELECT COUNT(*) FROM testimonials');
        console.log(`\n📊 Total testimonials in database: ${countResult.rows[0].count}`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

addTestimonials();
