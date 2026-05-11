"use client"

import type { PickupDetails } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Clock } from "lucide-react"

interface SchedulePickupProps {
  value: PickupDetails
  onChange: (details: PickupDetails) => void
  onConfirm: () => void
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

export function SchedulePickup({ value, onChange, onConfirm }: SchedulePickupProps) {
  const isValid = value.date && value.time && value.address.trim().length >= 5

  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold tracking-tight">Schedule your pickup</h2>
      <p className="text-sm text-muted-foreground -mt-4">
        We will come to you — at your convenience.
      </p>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Pickup Date
          </Label>
          <Input
            id="date"
            type="date"
            value={value.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Pickup Time
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onChange({ ...value, time: slot })}
                className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all active:scale-95 cursor-pointer ${
                  value.time === slot
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/30"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Pickup Address
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your full address"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm">
            Delivery Notes
          </Label>
          <Input
            id="notes"
            type="text"
            placeholder="Apartment number, buzzer code, etc. (optional)"
            value={value.notes ?? ""}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={onConfirm}
        className="w-full rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Confirm Booking
      </button>
    </div>
  )
}
