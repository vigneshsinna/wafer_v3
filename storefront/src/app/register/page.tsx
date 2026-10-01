"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading } = useAuthStore();
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
        try {
            await register({ name: form.name, email: form.email, phone: form.phone || undefined, password: form.password, password_confirmation: form.confirm });
            router.replace("/profile");
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Registration failed.");
        }
    }

    return <div className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-7xl px-gutter-sm py-space-xl md:px-gutter">
            <nav aria-label="Breadcrumb" className="mb-space-lg text-sm text-on-surface-variant"><Link href="/" className="hover:underline">Home</Link> / <span className="text-primary">Create Account</span></nav>
            <div className="grid overflow-hidden rounded-2xl bg-background-cream shadow-warm lg:grid-cols-12">
                <aside className="bg-primary-container p-space-lg text-on-primary sm:p-space-xl lg:col-span-5 lg:p-14">
                    <span className="material-symbols-outlined text-5xl text-tertiary-fixed">grain</span>
                    <h1 className="mt-5 font-headline-xl">Join the WaferKing Artisan Circle</h1>
                    <p className="mt-5 text-on-primary/80">Save your addresses, follow orders and keep your favourite products in one place.</p>
                    <div className="mt-10 space-y-4">
                        <p className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">local_shipping</span>Track orders from your pantry</p>
                        <p className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">favorite</span>Save your favourite flavours</p>
                        <p className="flex items-center gap-3"><span className="material-symbols-outlined text-tertiary-fixed">location_on</span>Manage delivery addresses</p>
                    </div>
                </aside>
                <section className="p-space-lg sm:p-space-xl lg:col-span-7 lg:p-14">
                    <p className="font-label-sm uppercase tracking-widest text-accent-700">Your artisan pantry</p>
                    <h2 className="mt-2 font-headline-lg text-primary">Create Your Account</h2>
                    {error && <p role="alert" className="mt-5 rounded-lg bg-error-container p-3 text-on-error-container">{error}</p>}
                    <form onSubmit={submit} className="mt-space-lg space-y-space-md">
                        <div className="grid gap-space-md sm:grid-cols-2">
                            <label className="block text-sm font-semibold text-primary">Full Name <span className="text-error">*</span><input required autoComplete="name" maxLength={255} className="input-field mt-2" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Mobile Number<input type="tel" autoComplete="tel" pattern="[0-9]{10}" title="Enter a 10-digit number" maxLength={10} className="input-field mt-2" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Email Address <span className="text-error">*</span><input required type="email" autoComplete="email" maxLength={255} className="input-field mt-2" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label>
                            <label className="block text-sm font-semibold text-primary">Delivery PIN Code<input disabled placeholder="Add with a shipping address later" className="input-field mt-2 opacity-60" /></label>
                        </div>
                        <div className="grid gap-space-md sm:grid-cols-2">
                            <label className="block text-sm font-semibold text-primary">Password <span className="text-error">*</span><span className="mt-2 flex rounded-lg border border-primary/25 bg-background-cream focus-within:ring-2 focus-within:ring-accent-700"><input required minLength={8} autoComplete="new-password" type={showPassword ? "text" : "password"} className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 outline-none" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="px-3"><span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span></button></span></label>
                            <label className="block text-sm font-semibold text-primary">Confirm Password <span className="text-error">*</span><input required minLength={8} autoComplete="new-password" type={showPassword ? "text" : "password"} className="input-field mt-2" value={form.confirm} onChange={event => setForm({ ...form, confirm: event.target.value })} /></label>
                        </div>
                        <label className="flex items-start gap-3 text-sm text-on-surface-variant"><input type="checkbox" disabled className="mt-1" />Send fresh batch notifications and WhatsApp dispatch updates to my phone. <span className="sr-only">Unavailable</span></label>
                        <label className="flex items-start gap-3 text-sm text-on-surface-variant"><input type="checkbox" required className="mt-1" /><span>By signing up, you agree to WaferKing <Link className="font-semibold text-accent-700 underline" href="/legal/terms-of-service">Terms &amp; Conditions</Link> and <Link className="font-semibold text-accent-700 underline" href="/legal/privacy-policy">Privacy Policy</Link>.</span></label>
                        <button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-container px-space-lg py-space-sm font-semibold text-on-primary disabled:opacity-50"><span className="material-symbols-outlined">token</span>{isLoading ? "Creating account…" : "Create My Artisan Account"}<span className="material-symbols-outlined">arrow_forward</span></button>
                    </form>
                    <p className="mt-space-lg text-center text-on-surface-variant">Already have an account? <Link href="/login" className="font-semibold text-accent-700 underline">Sign In</Link></p>
                </section>
            </div>
        </div>
    </div>;
}
