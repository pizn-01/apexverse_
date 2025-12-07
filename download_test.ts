
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

async function downloadImage() {
    const url = 'https://www.instagram.com/p/DQ-Tg0wktHN/media/?size=l';
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Unexpected response ${response.statusText}`);
        }

        // Check if it's actually an image
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        console.log('Final URL:', response.url);

        if (contentType && contentType.includes('image')) {
            const fileStream = fs.createWriteStream('test_image.jpg');
            if (response.body) {
                // @ts-ignore
                await streamPipeline(response.body, fileStream);
                console.log('Download successful!');
            }
        } else {
            console.log('Not an image. Likely a login page.');
            const text = await response.text();
            console.log('Preview:', text.substring(0, 200));
        }

    } catch (error) {
        console.error('Download failed:', error);
    }
}

downloadImage();
