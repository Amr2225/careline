export function DetailRow({
  icon,
  label,
  value,
  sub,
  mono,
  valueClass,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  mono?: boolean
  valueClass?: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
          {label}
        </p>
        <p
          className={`text-sm font-semibold ${
            mono ? "font-mono tabular-nums" : ""
          } ${valueClass ?? ""}`}
        >
          {value}
        </p>
        {sub ? <p className="mt-0.5 text-xs text-slate-500">{sub}</p> : null}
      </div>
    </div>
  )
}
