"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatINR } from "@/lib/money";

export default function CartDrawer() {
    const { cart, isOpen, closeCart, updateItem, removeItem, isLoading, error } =
        useCartStore();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-primary/10">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6 text-accent" />
                                <h2 className="font-display font-bold text-xl text-primary">
                                    Your Cart
                                </h2>
                                {cart.item_count > 0 && (
                                    <span className="bg-accent text-primary text-sm font-bold px-2 py-0.5 rounded-full">
                                        {cart.item_count}
                                    </span>
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeCart}
                                className="p-2 hover:bg-background-cream rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-primary" />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {error && <p role="alert" className="text-red-600 text-sm mb-4">{error}</p>}
                            {cart.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <ShoppingBag className="w-16 h-16 text-primary/20 mb-4" />
                                    <p className="text-primary/60 text-lg">Your cart is empty</p>
                                    <p className="text-primary/40 text-sm mt-1">
                                        Add some delicious wafers!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="bg-background-cream rounded-xl p-4"
                                        >
                                            <div className="flex gap-4">
                                                {/* Product Image Placeholder */}
                                                <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-2xl">🧇</span>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-primary truncate">
                                                        {item.product_name}
                                                    </h3>
                                                    <p className="text-sm text-primary/60">
                                                        {formatINR(item.price)} each
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-2">
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() =>
                                                                    updateItem(item.id, item.quantity - 1)
                                                                }
                                                                disabled={isLoading || item.quantity <= item.min_qty}
                                                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-accent/20 transition-colors disabled:opacity-50"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </motion.button>
                                                            <span className="w-8 text-center font-semibold">
                                                                {item.quantity}
                                                            </span>
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() =>
                                                                    updateItem(item.id, item.quantity + 1)
                                                                }
                                                                disabled={isLoading}
                                                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-accent/20 transition-colors disabled:opacity-50"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-primary">
                                                                {formatINR(item.price * item.quantity)}
                                                            </span>
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => removeItem(item.id)}
                                                                disabled={isLoading}
                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer with Totals */}
                        {cart.items.length > 0 && (
                            <div className="border-t border-primary/10 p-6 bg-background-cream">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-primary/70">
                                        <span>Subtotal</span>
                                        <span>{formatINR(cart.summary.sub_total)}</span>
                                    </div>
                                    {isAuthenticated ? <>
                                        <div className="flex justify-between text-primary/70"><span>Tax</span><span>{formatINR(cart.summary.tax)}</span></div>
                                        <div className="flex justify-between text-primary/70"><span>Shipping</span><span>{formatINR(cart.summary.shipping_cost)}</span></div>
                                        <div className="flex justify-between font-bold text-lg text-primary pt-2 border-t border-primary/10">
                                            <span>Estimated total</span><span className="text-accent">{formatINR(cart.summary.grand_total)}</span>
                                        </div>
                                    </> : <p className="text-xs text-primary/60">GST included; shipping shown at checkout.</p>}
                                </div>

                                <Link href="/checkout" onClick={closeCart}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full btn-accent text-center"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
