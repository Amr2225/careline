"use client"

import { ErrorState } from "../../_components/states"

export default function TemplateDetailError({ reset }: { reset: () => void }) {
  return (
    <ErrorState
      title="Couldn't load template"
      description="We couldn't fetch this template. It may have been deleted, or your connection dropped."
      onRetry={reset}
    />
  )
}
