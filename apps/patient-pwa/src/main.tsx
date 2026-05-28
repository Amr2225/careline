import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/app/App.js"
import "@careline/ui/globals.css"

import { createBrowserRouter, Navigate } from "react-router"
import { RouterProvider } from "react-router/dom"
import LoginPage from "./pages/login/page.tsx"
import BookingPage from "./pages/book/page.tsx"
import NextAvailableAppointmentPage from "./pages/book/next-available.tsx"
import AppointmentsPage from "./pages/appointments/page.tsx"

const router = createBrowserRouter([
  {
    path: "/portal",
    element: <App />,
  },
  {
    path: "/book",
    element: <BookingPage />,
  },
  {
    path: "/book/next-available",
    element: <NextAvailableAppointmentPage />,
  },
  {
    path: "/appointments",
    element: <AppointmentsPage />,
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
    <RouterProvider router={router} />
  </StrictMode>
)
