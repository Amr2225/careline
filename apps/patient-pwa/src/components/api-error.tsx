import { AlertCircle, RotateCw } from "lucide-react"

type ApiErrorProps = {
  title?: string
  message?: string
  actionLabel?: string
  onRetry?: () => void
}

export function ApiError({
  title = "Couldn't load this",
  message = "Something went wrong while fetching the latest data. Check your connection and try again.",
  actionLabel = "Try again",
  onRetry,
}: ApiErrorProps) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-3xl border border-rose-100 bg-rose-50/60 p-5 text-center shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
        <AlertCircle className="size-5" />
      </span>

      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
        {message}
      </p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mx-auto mt-5 flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(6,95,70,0.2)] transition-colors hover:bg-emerald-900"
        >
          <RotateCw className="size-4" />
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
