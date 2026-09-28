"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading } = useAuthStore();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await register({
                name: formData.full_name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            });
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-warm w-full max-w-md">
                <h1 className="font-display text-3xl font-bold text-primary mb-6 text-center">
                    Create Account
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                    />
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
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full mt-6"
                    >
                        Register
                    </Button>
                </form>

                <p className="mt-6 text-center text-primary/60 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-accent hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
