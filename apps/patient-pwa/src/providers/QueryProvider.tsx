import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useState, type ReactNode } from "react"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
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
let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => getQueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
