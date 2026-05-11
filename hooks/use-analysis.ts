"use client"

import { useState, useCallback } from "react"
import type { ShoeAnalysis } from "@/types"

interface UseAnalysisReturn {
  analyze: (file: File) => Promise<ShoeAnalysis>
  analysis: ShoeAnalysis | null
  imageUrl: string | null
  isLoading: boolean
  error: string | null
  reset: () => void
}

export function useAnalysis(): UseAnalysisReturn {
  const [analysis, setAnalysis] = useState<ShoeAnalysis | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = useCallback(async (file: File): Promise<ShoeAnalysis> => {
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }

      setAnalysis(data.analysis)
      return data.analysis as ShoeAnalysis
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setAnalysis(null)
    setImageUrl(null)
    setIsLoading(false)
    setError(null)
  }, [])

  return { analyze, analysis, imageUrl, isLoading, error, reset }
}
