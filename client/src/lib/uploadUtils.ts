// Upload utility functions for portfolio and testimonials

export async function uploadPortfolioImages(lineArt: File, fullArt: File): Promise<{ lineArtUrl: string; fullArtUrl: string }> {
    const formData = new FormData();
    formData.append('lineArt', lineArt);
    formData.append('fullArt', fullArt);

    const response = await fetch('/api/upload/portfolio', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload portfolio images');
    }

    return response.json();
}

export async function uploadTestimonialImage(image: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/upload/testimonial', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload testimonial image');
    }

    return response.json();
}

// Validate file size (5MB max)
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
}

// Validate file type (images only)
export function validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
}

// Get file size in human-readable format
export function getFileSizeString(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
