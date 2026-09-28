"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getProductReviews, createReview, getReviewStats } from "@/lib/api";
import type { Review, ReviewStats } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ProductReviewsProps {
    slug: string;
}

export default function ProductReviews({ slug }: ProductReviewsProps) {
    const { isAuthenticated, user } = useAuthStore();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState<ReviewStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [formData, setFormData] = useState({ rating: 5, comment: "" });

    useEffect(() => {
        fetchReviews();
    }, [slug]);

    async function fetchReviews() {
        setLoading(true);
        try {
            const [reviewsData, statsData] = await Promise.all([
                getProductReviews(slug),
                getReviewStats(slug)
            ]);
            setReviews(reviewsData);
            setStats(statsData);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!isAuthenticated) return;

        setSubmitting(true);
        setSubmitError("");
        setSubmitSuccess(false);

        try {
            await createReview(slug, {
                rating: formData.rating,
                comment: formData.comment
            });
            setSubmitSuccess(true);
            setShowForm(false);
            setFormData({ rating: 5, comment: "" });
            // Refresh reviews
            fetchReviews();
        } catch (error: any) {
            setSubmitError(error.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    }

    function renderStars(rating: number, interactive: boolean = false, onChange?: (rating: number) => void) {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type={interactive ? "button" : undefined}
                        onClick={interactive && onChange ? () => onChange(star) : undefined}
                        className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
                        disabled={!interactive}
                    >
                        <Star
                            className={`w-5 h-5 ${
                                star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-primary/30"
                            }`}
                        />
                    </button>
                ))}
            </div>
        );
    }

    function renderRatingBar(rating: number, count: number, total: number) {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return (
            <div className="flex items-center gap-2 text-sm">
                <span className="w-3">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-primary/15 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="w-8 text-primary/60">{count}</span>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="py-12 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <section className="py-12 border-t border-primary/15">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-primary mb-8">Customer Reviews</h2>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Stats Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-background rounded-xl p-6">
                            {stats && stats.total_reviews > 0 ? (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="text-5xl font-bold text-primary mb-2">
                                            {stats.average_rating.toFixed(1)}
                                        </div>
                                        <div className="flex justify-center mb-2">
                                            {renderStars(Math.round(stats.average_rating))}
                                        </div>
                                        <p className="text-primary/70">
                                            Based on {stats.total_reviews} review{stats.total_reviews !== 1 ? "s" : ""}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating}>
                                                {renderRatingBar(
                                                    rating,
                                                    stats.rating_distribution[rating] || 0,
                                                    stats.total_reviews
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <Star className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                                    <p className="text-primary/60">No reviews yet</p>
                                    <p className="text-sm text-primary/50">Be the first to review!</p>
                                </div>
                            )}

                            {/* Write Review Button */}
                            {isAuthenticated ? (
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="w-full mt-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Write a Review
                                </button>
                            ) : (
                                <p className="text-center text-sm text-primary/60 mt-6">
                                    <a href="/login" className="text-primary hover:underline">Sign in</a> to write a review
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-2">
                        {/* Success Message */}
                        {submitSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span>Thank you! Your review has been submitted and is pending approval.</span>
                            </motion.div>
                        )}

                        {/* Review Form */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <form onSubmit={handleSubmit} className="bg-white border border-primary/15 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-primary mb-4">Write Your Review</h3>

                                        {submitError && (
                                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                {submitError}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-primary/80 mb-2">
                                                Your Rating
                                            </label>
                                            {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-primary/80 mb-2">
                                                Your Review *
                                            </label>
                                            <textarea
                                                required
                                                minLength={10}
                                                rows={4}
                                                value={formData.comment}
                                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                placeholder="Tell us about your experience with this product..."
                                                className="w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                                Submit Review
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowForm(false)}
                                                className="px-6 py-2 border border-primary/30 rounded-lg hover:bg-background"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Reviews */}
                        {reviews.length === 0 ? (
                            <div className="text-center py-12 bg-background rounded-xl">
                                <p className="text-primary/60">No reviews yet. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white border border-primary/15 rounded-xl p-6"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-primary">
                                                            {review.user_name}
                                                        </span>
                                                        {review.is_verified_purchase && (
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Verified Purchase
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-primary/60">
                                                        {renderStars(review.rating)}
                                                        <span>•</span>
                                                        <span>{new Date(review.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-primary/70">{review.comment}</p>

                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
