import React, { Suspense } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import { DatePicker } from "@careline/ui/components/date-picker"
import UserPage from "@/components/user"

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Today's Queue</h1>

        <div className="flex items-center gap-2">
          <DatePicker />

          <Select defaultValue="1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Queue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Dr. John Doe</SelectItem>
                <SelectItem value="2">Dr. Jane Doe</SelectItem>
                <SelectItem value="3">Dr. John Smith</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserPage />
      </Suspense>
    </div>
  )
}
