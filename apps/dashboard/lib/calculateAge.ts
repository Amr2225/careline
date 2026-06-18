export function calculateAge(dob: string): number {
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const currentMonth = today.getMonth() - birth.getMonth()

    if (currentMonth < 0 || (currentMonth === 0 && today.getDate() < birth.getDate())) age--
    return age
}
