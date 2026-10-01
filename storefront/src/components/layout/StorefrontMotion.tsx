"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { initScrollMotion } from "@/lib/scrollMotion";

export default function StorefrontMotion({ children }: { children: React.ReactNode }) {
    useEffect(() => initScrollMotion(document.body), []);
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
