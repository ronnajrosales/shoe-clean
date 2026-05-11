export interface ShoeAnalysis {
  shoe_type: string
  condition: string
  recommended_service: string
  price_estimate: string
  duration: string
}

export interface PickupDetails {
  date: string
  time: string
  address: string
  notes?: string
}

export interface Booking {
  analysis: ShoeAnalysis
  pickup: PickupDetails
  imageUrl: string
}

export type Step = "upload" | "analyzing" | "result" | "schedule" | "confirm"
