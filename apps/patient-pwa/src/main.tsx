import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/app/App.js"
import "@careline/ui/globals.css"

import { createBrowserRouter, Navigate } from "react-router"
import { RouterProvider } from "react-router/dom"
import LoginPage from "./pages/login/page.tsx"
import { QueryProvider } from "./providers/QueryProvider.tsx"
import { Toaster } from "@careline/ui/components/sonner"

const router = createBrowserRouter([
  {
    path: "/portal",
    element: <App />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/portal" />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </QueryProvider>
  </StrictMode>
)
