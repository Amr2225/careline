export function formatDate(input: string | null): string {
    if (!input) return "—"

    return new Date(input).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}