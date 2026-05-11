"use client"

import { useState, useCallback } from "react"
import type { Step, PickupDetails, Booking } from "@/types"
import { useAnalysis } from "@/hooks/use-analysis"
import { useToast } from "@/components/toast-provider"
import { Stepper } from "@/components/stepper"
import { UploadZone } from "@/components/upload-zone"
import { AnalysisSkeleton } from "@/components/skeleton"
import { AnalysisResult } from "@/components/analysis-result"
import { SchedulePickup } from "@/components/schedule-pickup"
import { Confirmation } from "@/components/confirmation"
import { Sparkles } from "lucide-react"

const INITIAL_PICKUP: PickupDetails = { date: "", time: "", address: "" }

export default function Home() {
  const [step, setStep] = useState<Step>("upload")
  const [pickup, setPickup] = useState<PickupDetails>(INITIAL_PICKUP)
  const [booking, setBooking] = useState<Booking | null>(null)
  const { analyze, analysis, imageUrl, reset } = useAnalysis()
  const { toast } = useToast()

  const handleUpload = useCallback(
    async (file: File) => {
      setStep("analyzing")
      try {
        await analyze(file)
        setStep("result")
      } catch {
        setStep("upload")
      }
    },
    [analyze]
  )

  const handleReset = () => {
    reset()
    setPickup(INITIAL_PICKUP)
    setBooking(null)
    setStep("upload")
  }

  const handleScheduleConfirm = () => {
    if (!analysis || !imageUrl) return
    setBooking({ analysis, pickup, imageUrl })
    setStep("confirm")
    toast("Your pickup has been scheduled!", "success")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-lg px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold tracking-tight">SoleCare</h1>
          </div>
          {step !== "upload" && step !== "analyzing" && (
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start over
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-lg w-full px-4 py-4">
        <Stepper current={step} />
      </div>

      <main className="flex-1 mx-auto max-w-lg w-full px-4 pb-8">
        {renderStep()}
      </main>
    </div>
  )

  function renderStep() {
    switch (step) {
      case "upload":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 py-4">
              <h2 className="text-2xl font-bold tracking-tight">Fresh kicks, delivered</h2>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Snap a photo of your shoes and we will pick them up, clean them, and bring them back like new.
              </p>
            </div>
            <UploadZone onUpload={handleUpload} isLoading={false} />
          </div>
        )

      case "analyzing":
        return (
          <div className="space-y-4">
            <div className="text-center py-4 space-y-2">
              <div className="mx-auto h-10 w-10 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-foreground">Analyzing your shoes...</p>
              <p className="text-xs text-muted-foreground">Our AI is checking the condition</p>
            </div>
            <AnalysisSkeleton />
          </div>
        )

      case "result":
        return analysis && imageUrl ? (
          <AnalysisResult
            analysis={analysis}
            imageUrl={imageUrl}
            onContinue={() => setStep("schedule")}
          />
        ) : null

      case "schedule":
        return (
          <SchedulePickup
            value={pickup}
            onChange={setPickup}
            onConfirm={handleScheduleConfirm}
          />
        )

      case "confirm":
        return booking ? (
          <Confirmation booking={booking} onDone={handleReset} />
        ) : null

      default:
        return null
    }
  }
}
