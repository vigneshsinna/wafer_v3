"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatINR } from "@/lib/money";
import { isOptimizableImage } from "@/lib/images";

export default function CartDrawer() {
    const { cart, isOpen, closeCart, updateItem, removeItem, isLoading, error } = useCartStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
                        className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background-cream shadow-2xl z-50 flex flex-col border-l border-surface-container-high/60"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-surface-container bg-surface">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[24px] text-accent-700">
                                    shopping_bag
                                </span>
                                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                                    Your Harvest Box
                                </h2>
                                {cart.item_count > 0 && (
                                    <span className="bg-primary-container text-on-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cart.item_count}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant hover:text-primary"
                                aria-label="Close cart drawer"
                            >
                                <span className="material-symbols-outlined text-[22px]">close</span>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {error && (
                                <p role="alert" className="text-error text-sm mb-4 bg-error-container/20 p-2 rounded">
                                    {error}
                                </p>
                            )}
                            {cart.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-[32px] text-primary-50">
                                            shopping_bag
                                        </span>
                                    </div>
                                    <p className="font-headline-sm text-headline-sm text-primary font-bold">
                                        Your cart is empty
                                    </p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                                        Explore our crisp botanical harvest wafers from Erode!
                                    </p>
                                    <Link
                                        href="/#flavours"
                                        onClick={closeCart}
                                        className="mt-6 px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-700 transition-colors shadow-sm"
                                    >
                                        Browse Flavours
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-high/40"
                                        >
                                            <div className="flex gap-3">
                                                {/* Product Image */}
                                                <div className="relative w-16 h-16 rounded-lg bg-surface-container flex-shrink-0 overflow-hidden">
                                                    {item.thumbnail_url ? <Image
                                                        src={item.thumbnail_url}
                                                        alt={item.product_name}
                                                        fill
                                                        unoptimized={!isOptimizableImage(item.thumbnail_url)}
                                                        sizes="80px"
                                                        className="object-cover"
                                                    /> : <span className="flex h-full items-center justify-center text-primary-50"><span className="material-symbols-outlined">inventory_2</span></span>}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-label-lg text-label-lg font-semibold text-primary truncate">
                                                        {item.product_name}
                                                    </h3>
                                                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                        {formatINR(item.price)} each
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-container">
                                                        <div className="flex items-center gap-1.5 bg-surface-container-low rounded-lg p-1 border border-surface-container">
                                                            <button
                                                                onClick={() => updateItem(item.id, item.quantity - 1)}
                                                                disabled={isLoading || item.quantity <= (item.min_qty || 1)}
                                                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-30 text-primary font-bold select-none"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="w-6 text-center font-bold text-xs text-primary select-none">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateItem(item.id, item.quantity + 1)}
                                                                disabled={isLoading}
                                                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-30 text-primary font-bold select-none"
                                                                aria-label="Increase quantity"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="font-label-md text-label-md font-bold text-primary">
                                                                {formatINR(item.price * item.quantity)}
                                                            </span>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                disabled={isLoading}
                                                                className="p-1 text-on-surface-variant hover:text-error rounded transition-colors disabled:opacity-50"
                                                                aria-label="Remove item"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    delete
                                                                </span>
                                                            </button>
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
                            <div className="border-t border-surface-container p-6 bg-surface">
                                <div className="mb-4 rounded-lg bg-surface-container-low p-3 text-xs text-on-surface-variant">
                                    <p className="font-semibold text-primary">Free shipping eligibility</p>
                                    <div className="mt-2 h-2 rounded-full bg-surface-container-high" aria-hidden="true" />
                                    <p className="mt-2">Shown after you choose a delivery address at checkout.</p>
                                </div>
                                <div className="space-y-2 mb-4 font-body-sm text-body-sm text-on-surface-variant">
                                    <div className="flex justify-between">
                                        <span>Items Subtotal</span>
                                        <span className="font-semibold text-primary">
                                            {formatINR(cart.summary.sub_total)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-secondary font-semibold">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between font-headline-sm text-headline-sm text-primary font-bold pt-2 border-t border-surface-container">
                                        <span>Current Cart Total</span>
                                        <span>{formatINR(cart.summary.grand_total)}</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant pt-1">
                                        Final shipping and tax amounts appear at checkout.
                                    </p>
                                </div>

                                <Link href="/checkout" onClick={closeCart} className="w-full py-3.5 px-6 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-700 transition-all shadow-md flex items-center justify-center gap-2 active:scale-98">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                    <span>Proceed to Express Checkout</span>
                                </Link>
                                <button type="button" onClick={closeCart} className="mt-3 w-full text-center text-sm font-semibold text-accent-700 underline">Continue Shopping</button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
