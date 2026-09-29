import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoreBlog } from "@/lib/storeContent";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getStoreBlog(params.slug);
    return { title: post ? `${post.title} | WaferKing` : "Article | WaferKing", description: post?.excerpt || undefined };
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
    const post = await getStoreBlog(params.slug);
    if (!post) notFound();

    return <article className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-4xl px-gutter-sm py-space-xl md:px-gutter lg:py-24">
            <Link href="/blog" className="inline-flex items-center gap-space-xs font-label-md font-semibold text-accent-700 hover:text-primary"><span className="material-symbols-outlined text-[18px]">arrow_back</span>All articles</Link>
            {post.category && <p className="mt-space-xl font-label-md font-semibold uppercase tracking-widest text-accent-700">{post.category}</p>}
            <h1 className="mt-space-sm font-headline-xl text-headline-xl-mobile font-extrabold text-primary md:text-headline-xl">{post.title}</h1>
            {post.published_at && <p className="mt-space-md font-body-sm text-body-sm text-on-surface-variant">{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>}
            {post.image_url && <div className="relative mt-space-xl aspect-[16/9] overflow-hidden rounded-2xl bg-background-warm"><Image src={post.image_url} alt="" fill unoptimized className="object-cover" priority /></div>}
            <div className="mt-space-xl space-y-space-md font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                {(post.body || post.excerpt).split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)}
            </div>
        </div>
    </article>;
}
