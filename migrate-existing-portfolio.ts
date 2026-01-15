// Script to migrate existing portfolio images to database
import { storage } from './server/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Portfolio items based on existing images
const portfolioData = [
    {
        title: "Character Scene 1",
        category: "Character Art",
        lineArt: "IMG_1Line_art.jpg",
        fullArt: "IMG_1.jpg",
    },
    {
        title: "Character Scene 2",
        category: "Character Art",
        lineArt: "IMG_2Line_art.jpg",
        fullArt: "IMG_2.jpg",
    },
    {
        title: "Character Scene 3",
        category: "Character Art",
        lineArt: "IMG_3Line_art.jpg",
        fullArt: "IMG_3.jpg",
    },
    {
        title: "Character Scene 4",
        category: "Character Art",
        lineArt: "IMG_4Line_art.jpg",
        fullArt: "IMG_4.jpg",
    },
    {
        title: "Character Scene 5",
        category: "Character Art",
        lineArt: "IMG_5Line_art.jpg",
        fullArt: "IMG_5.jpg",
    },
    {
        title: "Character Scene 6",
        category: "Character Art",
        lineArt: "IMG_6Line_art.jpg",
        fullArt: "IMG_6.jpg",
    },
    {
        title: "Character Scene 7",
        category: "Character Art",
        lineArt: "IMG_7Line_art.jpg",
        fullArt: "IMG_7.jpg",
    },
];

async function migratePortfolioImages() {
    const sourceDir = path.join(__dirname, 'attached_assets');
    const destDir = path.join(__dirname, 'client/public/assets/portfolio');

    // Ensure destination directory exists
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    console.log('🔄 Migrating portfolio images...\n');

    for (const item of portfolioData) {
        try {
            // Copy line art file
            const lineArtSource = path.join(sourceDir, item.lineArt);
            const lineArtDest = path.join(destDir, item.lineArt);

            if (fs.existsSync(lineArtSource)) {
                fs.copyFileSync(lineArtSource, lineArtDest);
                console.log(`✅ Copied ${item.lineArt}`);
            } else {
                console.warn(`⚠️  Line art not found: ${item.lineArt}`);
            }

            // Copy full art file
            const fullArtSource = path.join(sourceDir, item.fullArt);
            const fullArtDest = path.join(destDir, item.fullArt);

            if (fs.existsSync(fullArtSource)) {
                fs.copyFileSync(fullArtSource, fullArtDest);
                console.log(`✅ Copied ${item.fullArt}`);
            } else {
                console.warn(`⚠️  Full art not found: ${item.fullArt}`);
            }

            // Create database entry
            const portfolioItem = await storage.createPortfolioItem({
                title: item.title,
                category: item.category,
                lineArtUrl: `/assets/portfolio/${item.lineArt}`,
                fullArtUrl: `/assets/portfolio/${item.fullArt}`,
            });

            console.log(`✅ Created database entry: ${item.title}\n`);
        } catch (error) {
            console.error(`❌ Failed to migrate ${item.title}:`, error);
        }
    }

    console.log('🎉 Migration complete!');
}

migratePortfolioImages().catch(console.error);
