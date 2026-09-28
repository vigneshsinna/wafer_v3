"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isLoading } = useAuthStore();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(formData.email, formData.password);
            const next = searchParams.get("next");
            router.push(next?.startsWith("/") && !next.startsWith("//") ? next : "/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid credentials");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-warm w-full max-w-md">
            <h1 className="font-display text-3xl font-bold text-primary mb-2 text-center">
                Customer sign in
            </h1>
            <p className="mb-6 text-center text-sm text-primary/60">Staff accounts use the Wafer King admin panel.</p>

            {error && (
                <div role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full mt-4"
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-4 text-center">
                <Link href="/forgot-password" className="text-sm text-primary/70 hover:text-primary">
                    Forgot your password?
                </Link>
            </div>

            <p className="mt-6 text-center text-primary/60 text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-accent-700 hover:underline font-medium">
                    Create one
                </Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
            <Suspense fallback={
                <div className="bg-white p-8 rounded-2xl shadow-warm w-full max-w-md flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                </div>
            }>
                <LoginContent />
            </Suspense>
        </div>
    );
}
