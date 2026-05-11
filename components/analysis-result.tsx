"use client"

import type { ShoeAnalysis } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Sparkles, Clock } from "lucide-react"

interface AnalysisResultProps {
  analysis: ShoeAnalysis
  imageUrl: string
  onContinue: () => void
}

export function AnalysisResult({ analysis, imageUrl, onContinue }: AnalysisResultProps) {
  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-hidden rounded-2xl border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Analyzed shoe"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="flex items-center gap-2 text-emerald-600">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-medium">Analysis complete</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-secondary/30 border-border">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Type</p>
            <p className="text-sm font-semibold">{analysis.shoe_type}</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-border">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Condition</p>
            <p className="text-sm font-semibold">{analysis.condition}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recommended Service</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium">{analysis.recommended_service}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-lg font-bold text-primary">{analysis.price_estimate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated turnaround: {analysis.duration}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
      >
        Continue to Schedule Pickup
      </button>
    </div>
  )
}
