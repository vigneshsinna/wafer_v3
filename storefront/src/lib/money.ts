const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export function formatINR(amount: number): string {
    return inr.format(amount);
}
