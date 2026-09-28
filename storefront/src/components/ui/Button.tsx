"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
    variant?: "primary" | "accent" | "outline";
    children: ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function Button({
    variant = "primary",
    children,
    isLoading,
    disabled,
    className = "",
    type = "button",
    onClick,
}: ButtonProps) {
    const baseClass = variant === "primary"
        ? "btn-primary"
        : variant === "accent"
            ? "btn-accent"
            : "btn-outline";

    return (
        <motion.button
            type={type}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            disabled={disabled || isLoading}
            className={`${baseClass} ${className} inline-flex items-center justify-center gap-2`}
            onClick={onClick}
        >
            {isLoading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {children}
        </motion.button>
    );
}
