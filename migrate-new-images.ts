
// Script to migrate NEW user uploaded images
import { storage } from './server/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateNewImages() {
    const destDir = path.join(__dirname, 'client/public/assets/portfolio');

    // Ensure destination directory exists
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // New images from user (using absolute paths provided in metadata)
    const newImages = [
        {
            src: 'C:/Users/Airaf/.gemini/antigravity/brain/ce625338-18d0-4e3f-8f66-4cbfe325301c/uploaded_image_0_1768500150039.png',
            filename: 'new_item_line_art.png',
            type: 'lineArt'
        },
        {
            src: 'C:/Users/Airaf/.gemini/antigravity/brain/ce625338-18d0-4e3f-8f66-4cbfe325301c/uploaded_image_1_1768500150039.png',
            filename: 'new_item_full_art.png',
            type: 'fullArt'
        }
    ];

    console.log('🔄 Migrating new images...\n');

    for (const img of newImages) {
        const destPath = path.join(destDir, img.filename);
        try {
            fs.copyFileSync(img.src, destPath);
            console.log(`✅ Copied ${img.filename}`);
        } catch (err) {
            console.error(`❌ Failed to copy ${img.filename}:`, err);
        }
    }

    // Create DB entry
    try {
        const item = await storage.createPortfolioItem({
            title: "New Portfolio Item",
            category: "Illustration",
            lineArtUrl: `/assets/portfolio/new_item_line_art.png`,
            fullArtUrl: `/assets/portfolio/new_item_full_art.png`,
            description: "Newly added portfolio item"
        });
        console.log(`✅ Created database entry: ${item.title}`);
    } catch (err) {
        console.error("❌ Failed to create DB entry:", err);
    }

    console.log('🎉 Migration complete!');
    process.exit(0);
}

migrateNewImages().catch(console.error);
