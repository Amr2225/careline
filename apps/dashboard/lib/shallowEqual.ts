export function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>) {
    const firstObjectKeys = Object.keys(a), secondObjectKeys = Object.keys(b)
    if (firstObjectKeys.length !== secondObjectKeys.length) return false

    return firstObjectKeys.every((key) => a[key] === b[key])
}