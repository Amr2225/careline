import { create } from "zustand"
import type { BottomNavTab } from "@/components/bottom-nav-bar.js"

interface NavStore {
  activeTab: BottomNavTab
  /** Appointment whose detail panel should be shown on the Appointments tab. */
  openAppointmentId: string | null

  setActiveTab: (tab: BottomNavTab) => void
  setOpenAppointmentId: (id: string | null) => void
  /** Jump to an appointment's detail from anywhere (e.g. the Home card). */
  openAppointment: (id: string) => void
}

export const useNavStore = create<NavStore>((set) => ({
  activeTab: "home",
  openAppointmentId: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setOpenAppointmentId: (id) => set({ openAppointmentId: id }),
  openAppointment: (id) =>
    set({ activeTab: "appointments", openAppointmentId: id }),
}))
