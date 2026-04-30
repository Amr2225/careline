import { z } from "zod"

export const validateName = (val: string) => {
    const result = z.string().trim()
        .pipe(z.string().min(1, { error: "Name is required" }))
        .safeParse(val)

    if (!result.success) {
        throw new Error(z.prettifyError(result.error))
    }

    return result.data
}

export const validateEmail = (val: string) => {
    const result = z.string().trim().pipe(z.email()).safeParse(val)

    if (!result.success) {
        throw new Error(z.prettifyError(result.error))
    }

    return result.data
}

export const validatePassword = (val: string) => {
    const result = z.string().trim().pipe(
        z.string().min(8, { error: "Password should be at least 8 characters long" }).refine(
            (val) => {
                const regex = /^(?=.*[0-9])(?=.*[A-Z]).+$/
                return regex.test(val)
            }, { message: "Password must contain at least one number, one uppercase letter, and one special character" }))
        .safeParse(val)

    if (!result.success) {
        throw new Error(z.prettifyError(result.error))
    }

    return result.data;
}