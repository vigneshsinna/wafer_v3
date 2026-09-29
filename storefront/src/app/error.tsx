"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Automatically recover from chunk load errors by refreshing the page
        if (
            error?.name === "ChunkLoadError" ||
            error?.message?.includes("Loading chunk") ||
            error?.message?.includes("ChunkLoadError")
        ) {
            window.location.reload();
        }
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Something went wrong</h2>
            <p className="text-on-surface-variant text-sm mb-6 max-w-md">
                We encountered an unexpected error while loading this page.
            </p>
            <button
                type="button"
                onClick={() => {
                    if (
                        error?.name === "ChunkLoadError" ||
                        error?.message?.includes("Loading chunk")
                    ) {
                        window.location.reload();
                    } else {
                        reset();
                    }
                }}
                className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-semibold hover:bg-primary-700 transition-colors shadow-sm"
            >
                Reload Page
            </button>
        </div>
    );
}
