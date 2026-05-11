import { NextResponse } from "next/server"
import type { ShoeAnalysis } from "@/types"

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get("image") as File | null

  if (!image) {
    return NextResponse.json(
      { error: "No image provided. Please upload a photo of your shoes." },
      { status: 400 }
    )
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Please upload a valid image file." },
      { status: 400 }
    )
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (image.size > maxSize) {
    return NextResponse.json(
      { error: "Image is too large. Max size is 10MB." },
      { status: 400 }
    )
  }

  // Simulate processing delay (1-3s)
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  )

  const analysis: ShoeAnalysis = {
    shoe_type: "Sneakers",
    condition: "Moderate dirt",
    recommended_service: "Deep Cleaning",
    price_estimate: "$8",
    duration: "2 days",
  }

  return NextResponse.json({ success: true, analysis })
}
