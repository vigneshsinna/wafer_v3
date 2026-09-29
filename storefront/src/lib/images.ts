export function isOptimizableImage(src: string): boolean {
    try {
        const api = new URL(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v3");
        const image = new URL(src);
        return image.origin === api.origin && image.pathname.startsWith("/uploads/");
    } catch {
        return false;
    }
}
