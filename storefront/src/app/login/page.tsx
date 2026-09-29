"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isLoading } = useAuthStore();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        try {
            await login(identifier.trim(), password);
            const next = searchParams.get("next");
            const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/profile";
            router.replace(target);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Sign in failed.");
        }
    }

    return <div className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-7xl px-gutter-sm py-space-xl md:px-gutter">
            <nav aria-label="Breadcrumb" className="mb-space-lg text-sm text-on-surface-variant"><Link href="/" className="hover:underline">Home</Link> / <span className="text-primary">Sign In</span></nav>
            <div className="grid overflow-hidden rounded-2xl bg-background-cream shadow-warm lg:grid-cols-2">
                <section className="p-space-lg sm:p-space-xl lg:p-14">
                    <span className="font-label-sm uppercase tracking-widest text-accent-700">The Artisan Pantry</span>
                    <h1 className="mt-3 font-headline-xl text-primary">Sign In to Your Artisan Pantry</h1>
                    <p className="mt-3 text-on-surface-variant">See your orders, addresses and favourite flavours.</p>
                    {error && <p role="alert" className="mt-5 rounded-lg bg-error-container p-3 text-on-error-container">{error}</p>}
                    <form onSubmit={submit} className="mt-space-lg space-y-space-md">
                        <label className="block font-label-md font-semibold text-primary">Email or Mobile Number
                            <input required autoComplete="username" className="input-field mt-2" placeholder="10-Digit Phone / Email" value={identifier} onChange={event => setIdentifier(event.target.value)} />
                        </label>
                        <label className="block font-label-md font-semibold text-primary">Password
                            <span className="mt-2 flex rounded-lg border border-primary/25 bg-background-cream focus-within:ring-2 focus-within:ring-accent-700">
                                <input required autoComplete="current-password" type={showPassword ? "text" : "password"} className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 outline-none" value={password} onChange={event => setPassword(event.target.value)} />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="px-3 text-on-surface-variant"><span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span></button>
                            </span>
                        </label>
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                            <label className="flex items-center gap-2 text-on-surface-variant"><input type="checkbox" checked disabled />Remember me on this trusted device</label>
                            <Link href="/forgot-password" className="font-semibold text-accent-700 hover:underline">Forgot password?</Link>
                        </div>
                        <button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-container px-space-lg py-space-sm font-semibold text-on-primary disabled:opacity-50">{isLoading ? "Signing in…" : "Sign In to Account"}<span className="material-symbols-outlined">arrow_forward</span></button>
                        <button type="button" disabled title="One-time passcode sign in is unavailable" className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 px-space-lg py-space-sm font-semibold text-primary opacity-50"><span className="material-symbols-outlined">sms</span>Send WhatsApp / SMS One-Time Passcode</button>
                    </form>
                    <p className="mt-space-lg text-center text-on-surface-variant">New to WaferKing? <Link href="/register" className="font-semibold text-accent-700 underline">Create Your Account</Link></p>
                </section>
                <aside className="bg-surface-container-low p-space-lg sm:p-space-xl lg:p-14">
                    <div className="rounded-2xl bg-primary-container p-space-xl text-on-primary">
                        <span className="material-symbols-outlined text-4xl text-tertiary-fixed">auto_awesome</span>
                        <h2 className="mt-3 font-headline-lg">Why Savour With an Account?</h2>
                        <div className="mt-space-lg space-y-space-md">
                            <div className="flex gap-3"><span className="material-symbols-outlined text-tertiary-fixed">local_shipping</span><div><h3 className="font-headline-sm">Farm Harvest Tracking</h3><p className="text-sm text-on-primary/80">Track your orders from your account.</p></div></div>
                            <div className="flex gap-3"><span className="material-symbols-outlined text-tertiary-fixed">shopping_bag</span><div><h3 className="font-headline-sm">One-Tap Replenish</h3><p className="text-sm text-on-primary/80">Find past orders and buy your favourites again.</p></div></div>
                            <div className="flex gap-3"><span className="material-symbols-outlined text-tertiary-fixed">favorite</span><div><h3 className="font-headline-sm">Private Small-Batch Allocations</h3><p className="text-sm text-on-primary/80">Save favourites to your wishlist.</p></div></div>
                        </div>
                    </div>
                    <p className="mt-space-lg text-sm text-on-surface-variant">Staff accounts use the WaferKing admin panel.</p>
                </aside>
            </div>
        </div>
    </div>;
}

export default function LoginPage() {
    return <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center">Loading sign in…</div>}><LoginContent /></Suspense>;
}
