import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, '../client/public/uploads');
const portfolioDir = path.join(uploadsDir, 'portfolio');
const testimonialsDir = path.join(uploadsDir, 'testimonials');

[uploadsDir, portfolioDir, testimonialsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure storage for portfolio images
const portfolioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, portfolioDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Configure storage for testimonial images
const testimonialStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, testimonialsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'testimonial-' + uniqueSuffix + ext);
    }
});

// File filter to accept only images
const imageFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'));
    }
};

// Multer upload configurations
export const uploadPortfolio = multer({
    storage: portfolioStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: imageFileFilter,
});

export const uploadTestimonial = multer({
    storage: testimonialStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: imageFileFilter,
});
