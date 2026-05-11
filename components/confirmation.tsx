"use client"

import type { Booking } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Package } from "lucide-react"

interface ConfirmationProps {
  booking: Booking
  onDone: () => void
}

export function Confirmation({ booking, onDone }: ConfirmationProps) {
  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center py-6">
        <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Booking confirmed!</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          We will take great care of your {booking.analysis.shoe_type.toLowerCase()}. Here is your pickup summary:
        </p>
      </div>

      <Card className="border-border">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Pickup</p>
              <p className="text-sm font-semibold">
                {new Date(booking.pickup.date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
                {" at "}
                {booking.pickup.time}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
              <p className="text-sm font-semibold">{booking.pickup.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Service</p>
              <p className="text-sm font-semibold">
                {booking.analysis.recommended_service} — {booking.analysis.price_estimate}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Expected in {booking.analysis.duration}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
      >
        Done
      </button>
    </div>
  )
}
