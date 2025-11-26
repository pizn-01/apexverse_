// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function getApiUrl(path: string): string {
    // In development, use relative URLs (Vite proxy handles it)
    // In production, use the full backend URL
    if (import.meta.env.DEV) {
        return path;
    }

    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
}

export { API_BASE_URL };
