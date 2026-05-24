"use client"

import { useMemo } from "react"
import { Lock } from "lucide-react"
import { Action } from "@careline/shared/types/rbac.type"
import { Checkbox } from "@careline/ui/components/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@careline/ui/components/tooltip"
import {
  ACTIONS,
  MODULE_NAMES,
  isActionApplicable,
  type ModuleName,
} from "@/lib/permissions"
import { cn } from "@careline/ui/lib/utils"

export type MatrixValue = Record<ModuleName, Record<Action, boolean>>

const ACTION_LABELS: Record<Action, string> = {
  [Action.READ]: "Read",
  [Action.WRITE]: "Write",
  [Action.UPDATE]: "Update",
  [Action.DELETE]: "Delete",
  [Action.UPDATE_MEDICAL]: "Medical",
}

const ACTION_HINT: Record<Action, string> = {
  [Action.READ]: "View",
  [Action.WRITE]: "Create",
  [Action.UPDATE]: "Edit",
  [Action.DELETE]: "Remove",
  [Action.UPDATE_MEDICAL]: "Clinical notes",
}

export function emptyMatrix(): MatrixValue {
  return MODULE_NAMES.reduce((acc, curr) => {
    acc[curr] = ACTIONS.reduce(
      (inner, a) => {
        inner[a] = false
        return inner
      },
      {} as Record<Action, boolean>
    )
    return acc
  }, {} as MatrixValue)
}

export function permissionsToMatrix(
  permissions: { moduleName: string; action: Action }[]
): MatrixValue {
  const m = emptyMatrix()

  for (const p of permissions) {
    if ((MODULE_NAMES as string[]).includes(p.moduleName)) {
      m[p.moduleName as ModuleName][p.action] = true
    }
  }
  return m
}

export function matrixToPermissions(matrix: MatrixValue): string[] {
  const result: string[] = []

  for (const module of MODULE_NAMES) {
    for (const action of ACTIONS) {
      if (!isActionApplicable(module, action)) continue
      if (matrix[module][action]) result.push(`${module}:${action}`)
    }
  }
  return result
}

type PermissionMatrixProps = {
  value: MatrixValue
  onChange: (next: MatrixValue) => void
  readOnly?: boolean
  lockReason?: string
}

type CellState = "checked" | "unchecked" | "indeterminate"

export function PermissionMatrix({
  value,
  onChange,
  readOnly = false,
  lockReason,
}: PermissionMatrixProps) {
  const applicableCount = useMemo(() => {
    let n = 0
    for (const m of MODULE_NAMES)
      for (const a of ACTIONS) if (isActionApplicable(m, a)) n++
    return n
  }, [])

  const grantCount = useMemo(() => {
    let n = 0
    for (const m of MODULE_NAMES)
      for (const a of ACTIONS) if (isActionApplicable(m, a) && value[m][a]) n++
    return n
  }, [value])

  const rowState = (m: ModuleName): CellState => {
    const applicable = ACTIONS.filter((a) => isActionApplicable(m, a))
    const trueCount = applicable.filter((a) => value[m][a]).length

    if (trueCount === 0) return "unchecked"
    if (trueCount === applicable.length) return "checked"
    return "indeterminate"
  }

  const colState = (a: Action): CellState => {
    const applicable = MODULE_NAMES.filter((m) => isActionApplicable(m, a))
    const trueCount = applicable.filter((m) => value[m][a]).length

    if (trueCount === 0) return "unchecked"
    if (trueCount === applicable.length) return "checked"
    return "indeterminate"
  }

  const totalState = (): CellState => {
    if (grantCount === 0) return "unchecked"
    if (grantCount === applicableCount) return "checked"
    return "indeterminate"
  }

  const setCell = (m: ModuleName, a: Action, v: boolean) => {
    if (readOnly) return
    if (!isActionApplicable(m, a)) return
    onChange({ ...value, [m]: { ...value[m], [a]: v } })
  }

  const toggleRow = (m: ModuleName) => {
    if (readOnly) return

    const next = rowState(m) !== "checked"
    const updated: MatrixValue = { ...value, [m]: { ...value[m] } }
    for (const a of ACTIONS) {
      if (isActionApplicable(m, a)) updated[m][a] = next
    }
    onChange(updated)
  }

  const toggleCol = (a: Action) => {
    if (readOnly) return
    const next = colState(a) !== "checked"
    const updated: MatrixValue = { ...value }
    for (const m of MODULE_NAMES) {
      if (!isActionApplicable(m, a)) continue
      updated[m] = { ...updated[m], [a]: next }
    }
    onChange(updated)
  }

  const toggleAll = () => {
    if (readOnly) return
    const next = totalState() !== "checked"
    const updated: MatrixValue = {} as MatrixValue
    for (const m of MODULE_NAMES) {
      updated[m] = { ...value[m] }
      for (const a of ACTIONS) {
        if (isActionApplicable(m, a)) updated[m][a] = next
      }
    }
    onChange(updated)
  }

  const stateToCheckedProp = (s: CellState) =>
    s === "indeterminate" ? "indeterminate" : s === "checked"

  return (
    <TooltipProvider>
    <div className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
      {readOnly && lockReason ? (
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          <Lock className="size-4 text-primary" />
          <span>{lockReason}</span>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <colgroup>
            <col className="w-[28%]" />
            {ACTIONS.map((a) => (
              <col key={a} />
            ))}
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border/70 bg-muted/40">
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Module
              </th>
              {ACTIONS.map((a) => (
                <th key={a} className="px-2 py-3 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                      {ACTION_LABELS[a]}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">
                      {ACTION_HINT[a]}
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-3 py-3 text-center text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                All
              </th>
            </tr>
          </thead>
          <tbody>
            {MODULE_NAMES.map((m, idx) => {
              const rs = rowState(m)
              return (
                <tr
                  key={m}
                  className={cn(
                    "border-b border-border/40 transition-colors",
                    idx % 2 === 0 ? "bg-card" : "bg-muted/20",
                    !readOnly && "hover:bg-primary/3"
                  )}
                >
                  <td className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block size-1.5 rounded-full bg-primary/60"
                        aria-hidden
                      />
                      {m}
                    </span>
                  </td>
                  {ACTIONS.map((a) => {
                    const applicable = isActionApplicable(m, a)
                    const checkbox = (
                      <Checkbox
                        checked={applicable ? value[m][a] : false}
                        onCheckedChange={(v) => setCell(m, a, v === true)}
                        disabled={readOnly || !applicable}
                        aria-label={`${ACTION_LABELS[a]} ${m}`}
                        className="size-5 rounded-md data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                      />
                    )
                    return (
                      <td key={a} className="px-2 py-3">
                        <div className="flex justify-center">
                          {applicable ? (
                            checkbox
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex">{checkbox}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                This action does not apply to {m}.
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    )
                  })}
                  <td className="px-3 py-3">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={stateToCheckedProp(rs)}
                        onCheckedChange={() => toggleRow(m)}
                        disabled={readOnly}
                        aria-label={`Toggle all actions for ${m}`}
                        className="size-5 rounded-md border-dashed data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-muted/40">
              <td className="px-4 py-3 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                All modules
              </td>
              {ACTIONS.map((a) => (
                <td key={a} className="px-2 py-3">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={stateToCheckedProp(colState(a))}
                      onCheckedChange={() => toggleCol(a)}
                      disabled={readOnly}
                      aria-label={`Toggle ${ACTION_LABELS[a]} across all modules`}
                      className="size-5 rounded-md border-dashed data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                  </div>
                </td>
              ))}
              <td className="px-3 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Checkbox
                    checked={stateToCheckedProp(totalState())}
                    onCheckedChange={() => toggleAll()}
                    disabled={readOnly}
                    aria-label="Toggle every permission"
                    className="size-5 rounded-md border-dashed data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border/70 bg-card px-4 py-3 text-sm">
        <span className="text-muted-foreground">
          Each grant unlocks one capability for one module.
        </span>
        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
          {grantCount} {grantCount === 1 ? "grant" : "grants"}
        </span>
      </div>
    </div>
    </TooltipProvider>
  )
}
