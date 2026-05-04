import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "@careline/ui/globals.css"

import { createBrowserRouter, Navigate } from "react-router"
import { RouterProvider } from "react-router/dom"
import LoginPage from "./pages/login/page.tsx"
import TestPage from "./pages/test.tsx"
import TestPage3 from "./pages/test copy 2.tsx"
import TestPage2 from "./pages/test copy.tsx"

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
  {
    path: "/projects",
    children: [
      { index: true, element: <TestPage /> },
      { path: ":id", element: <TestPage2 /> },
      { path: ":id/edit", element: <TestPage3 /> },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
