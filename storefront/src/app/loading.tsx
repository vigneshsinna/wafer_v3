export default function Loading() {
    return <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-gutter-sm pb-20 pt-32 md:px-gutter" role="status" aria-label="Loading page">
        <div className="h-10 w-2/3 rounded-lg bg-surface-container-high" />
        <div className="h-5 w-1/2 rounded bg-surface-container" />
        <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(item => <div key={item} className="h-72 rounded-xl bg-surface-container-low" />)}
        </div>
    </div>;
}
