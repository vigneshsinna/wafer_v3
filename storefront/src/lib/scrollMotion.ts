// Content stays visible without JavaScript or observer support.
export function initScrollMotion(root: HTMLElement) {
    if (!window.IntersectionObserver || !root.animate) return () => {};

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Map<Element, Animation>();
    const selector = "[data-scroll-reveal], [data-scroll-stagger] > *, main h1";
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            observer.unobserve(element);
            if (!element.isConnected || element.contains(document.activeElement)) continue;

            const reduce = reducedMotion.matches;
            const image = element.dataset.scrollReveal === "image";
            const stagger = element.parentElement?.hasAttribute("data-scroll-stagger")
                ? Array.from(element.parentElement.children).indexOf(element) % 4 : 0;
            const frames = reduce || element.tagName === "H1"
                ? [{ opacity: 0 }, { opacity: 1 }]
                : image
                    ? [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }]
                    : [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }];
            const animation = element.animate(frames, {
                duration: reduce || element.tagName === "H1" ? 200 : 600,
                delay: reduce ? 0 : stagger * 50,
                easing: image && !reduce ? "cubic-bezier(0.77, 0, 0.175, 1)" : "cubic-bezier(0.23, 1, 0.32, 1)",
                fill: "backwards",
            });
            animations.set(element, animation);
            animation.onfinish = () => animations.delete(element);
        }
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    function register() {
        root.querySelectorAll<HTMLElement>(selector).forEach(element => {
            // Reveal content groups once; do not animate their descendants twice.
            if (seen.has(element) || element.parentElement?.closest("[data-scroll-reveal], [data-scroll-stagger] > *")) return;
            seen.add(element);
            observer.observe(element);
        });
    }
    function cancelAnimations(event?: Event) {
        const target = event?.type === "focusin" ? event.target : null;
        for (const [element, animation] of animations) {
            if (!target || target instanceof Node && element.contains(target)) {
                animation.cancel();
                animations.delete(element);
            }
        }
    }
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    root.addEventListener("focusin", cancelAnimations);
    reducedMotion.addEventListener("change", cancelAnimations);

    return () => {
        observer.disconnect();
        mutations.disconnect();
        root.removeEventListener("focusin", cancelAnimations);
        reducedMotion.removeEventListener("change", cancelAnimations);
        cancelAnimations();
    };
}
