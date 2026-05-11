"use client"

import { useState, type ReactNode } from "react"
import { isAxiosError } from "axios"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          if (isAxiosError(error)) {
            const status = error.response?.status
            if (status && status >= 400 && status < 500) return false
          }
          return failureCount < 2
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(makeClient)
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
