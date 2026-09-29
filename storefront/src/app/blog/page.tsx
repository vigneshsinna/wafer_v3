import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStoreBlogs } from "@/lib/storeContent";

export const metadata: Metadata = {
    title: "Blog | WaferKing",
    description: "Stories and articles from WaferKing.",
};

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = Math.max(1, Number.parseInt(searchParams.page || "1", 10) || 1);
    const posts = await getStoreBlogs(page);
    const items = posts?.items || [];
    const pagination = posts?.pagination;

    return <div className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden bg-surface-container-low py-space-xl lg:py-24">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-tertiary-fixed/30 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-gutter-sm md:px-gutter">
                <span className="font-label-md font-semibold uppercase tracking-widest text-accent-700">The WaferKing Journal</span>
                <h1 className="mt-space-sm max-w-2xl font-headline-xl text-headline-xl-mobile font-extrabold text-primary md:text-headline-xl">Stories from our kitchen</h1>
                <p className="mt-space-md max-w-xl font-body-lg text-body-lg text-on-surface-variant">Explore our latest articles, product stories, and updates.</p>
            </div>
        </section>
        <section className="mx-auto max-w-7xl px-gutter-sm py-space-xl md:px-gutter lg:py-24">
            {items.length ? <div className="grid gap-space-lg sm:grid-cols-2 lg:grid-cols-3">
                {items.map(post => <article key={post.slug} className="flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
                    <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-background-warm">
                        {post.image_url ? <Image src={post.image_url} alt="" fill unoptimized className="object-cover transition-transform duration-300 hover:scale-105" /> : <span className="material-symbols-outlined flex h-full items-center justify-center text-[72px] text-primary-50">menu_book</span>}
                    </Link>
                    <div className="flex flex-1 flex-col p-space-lg">
                        {post.category && <span className="font-label-sm font-semibold uppercase tracking-wider text-accent-700">{post.category}</span>}
                        <h2 className="mt-space-xs font-headline-sm text-headline-sm text-primary"><Link href={`/blog/${post.slug}`} className="hover:text-accent-700">{post.title}</Link></h2>
                        {post.excerpt && <p className="mt-space-sm line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">{post.excerpt}</p>}
                        <div className="mt-auto flex items-center justify-between pt-space-lg font-label-sm text-label-sm text-on-surface-variant">
                            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
                            <Link href={`/blog/${post.slug}`} className="font-semibold text-secondary">Read article →</Link>
                        </div>
                    </div>
                </article>)}
            </div> : <div className="rounded-2xl bg-surface-container-low p-space-xl text-center">
                <span className="material-symbols-outlined text-[48px] text-accent-700">menu_book</span>
                <h2 className="mt-space-sm font-headline-sm text-headline-sm text-primary">No articles published yet</h2>
                <p className="mt-space-xs text-on-surface-variant">Check back for stories from WaferKing.</p>
                <Link href="/#flavours" className="mt-space-lg inline-flex rounded-full bg-primary-container px-space-lg py-space-sm font-semibold text-on-primary">Explore the collection</Link>
            </div>}
            {pagination && pagination.last_page > 1 && <nav aria-label="Blog pages" className="mt-space-xl flex items-center justify-center gap-space-sm">
                {page > 1 && <Link href={`/blog?page=${page - 1}`} className="rounded-full bg-surface-container-low px-space-md py-space-xs font-semibold text-primary">Previous</Link>}
                <span className="rounded-full bg-primary-container px-space-md py-space-xs font-semibold text-on-primary">{page} of {pagination.last_page}</span>
                {page < pagination.last_page && <Link href={`/blog?page=${page + 1}`} className="rounded-full bg-surface-container-low px-space-md py-space-xs font-semibold text-primary">Next</Link>}
            </nav>}
        </section>
    </div>;
}
