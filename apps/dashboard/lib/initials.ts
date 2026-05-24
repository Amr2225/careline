export function initials(name: string): string {
    const parts = name.trim().split(/\s+/)
    return (
        (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase()
    )
}