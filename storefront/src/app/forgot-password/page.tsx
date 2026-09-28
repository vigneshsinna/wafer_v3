"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <>
                    <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full mx-4 bg-white rounded-xl p-8 shadow-sm text-center"
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary mb-4">Check Your Email</h1>
                        <p className="text-primary/70 mb-6">
                            If an account exists for <strong>{email}</strong>, we've sent password reset instructions.
                        </p>
                        <Link href="/login" className="text-primary hover:underline">
                            Back to Login
                        </Link>
                    </motion.div>
                </div>
                </>
        );
    }

    return (
        <>
            <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full mx-4"
                >
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <Link href="/login" className="inline-flex items-center gap-2 text-primary/70 hover:text-primary mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>

                        <h1 className="text-2xl font-bold text-primary mb-2">Forgot Password?</h1>
                        <p className="text-primary/70 mb-6">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary/80 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
