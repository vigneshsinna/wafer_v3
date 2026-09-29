export interface StoreSettings {
    store_name: string;
    store_motto: string;
    store_logo: string | null;
    store_favicon: string | null;
    announcement_text?: string | null;
    contact_phone?: string | null;
    contact_email?: string | null;
    contact_address?: string | null;
    fssai_license?: string | null;
}

export interface StorePage {
    slug: string;
    title: string;
    content: string;
    meta_title: string | null;
    meta_description: string | null;
}

export interface StoreBlog {
    title: string;
    slug: string;
    excerpt: string;
    image_url: string | null;
    category: string | null;
    published_at: string | null;
    body?: string;
}

export interface StoreBlogPage {
    items: StoreBlog[];
    pagination: { current_page: number; last_page: number; total: number };
}

async function getPublicContent<T>(path: string): Promise<T | null> {
    const base = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v3").replace(/\/$/, "");
    try {
        const response = await fetch(`${base}${path}`, { cache: "no-store" });
        if (!response.ok) return null;
        const envelope = await response.json();
        return envelope.success ? envelope.data as T : null;
    } catch { return null; }
}

export const getStoreSettings = () => getPublicContent<StoreSettings>("/settings");
export const getStorePage = (slug: string) => getPublicContent<StorePage>(`/pages/${encodeURIComponent(slug)}`);
export const getStoreBlogs = (page = 1) => getPublicContent<StoreBlogPage>(`/blogs?page=${page}`);
export const getStoreBlog = (slug: string) => getPublicContent<StoreBlog>(`/blogs/${encodeURIComponent(slug)}`);
