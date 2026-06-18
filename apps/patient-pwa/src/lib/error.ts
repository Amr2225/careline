import { isAxiosError } from "axios"

export function extractErrorMessage(
  err: unknown,
  fallback = "Something went wrong."
): string {
  if (isAxiosError<{ message?: string | string[] }>(err)) {
    const msg = err.response?.data?.message

    if (Array.isArray(msg)) return msg.join(", ")
    if (typeof msg === "string" && msg.length > 0) return msg
    if (err.message) return err.message
  }

  if (err instanceof Error && err.message) return err.message
  return fallback
}
