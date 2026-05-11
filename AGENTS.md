# SoleCare — Premium Shoe Cleaning App

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Project Structure

```
app/
  api/analyze/route.ts   # POST /api/analyze — receives FormData, returns mock analysis
  layout.tsx             # Root layout with ToastProvider
  page.tsx               # Main page — step orchestrator (upload → analyze → result → schedule → confirm)
  globals.css            # shadcn/ui theme tokens + Tailwind
components/
  ui/                    # shadcn primitives (button, card, input, label)
  upload-zone.tsx        # Drag-and-drop + click-to-upload with preview
  analysis-result.tsx    # Displays AI analysis (type, condition, price, service)
  schedule-pickup.tsx    # Date picker, time slot grid, address form
  confirmation.tsx       # Booking summary with pickup details
  stepper.tsx            # 4-step progress indicator
  skeleton.tsx           # Skeleton loaders for analysis loading state
  toast-provider.tsx     # Toast notification context + UI
hooks/
  use-analysis.ts        # Wraps fetch("/api/analyze") with loading/error/reset
types/
  index.ts               # Shared types: ShoeAnalysis, PickupDetails, Booking, Step
```

## Environment Variables

Copy `.env.example` to `.env.local`. All variables are optional for local dev.

## Deployment

### Vercel (recommended)

```bash
npx vercel --prod
```

No extra config needed — Vercel auto-detects Next.js.

### Docker / AWS ECS

```bash
STANDALONE=true npm run build
# Dockerfile:
# FROM node:22-alpine
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# CMD ["node", "server.js"]
```

### Custom server

```bash
npm run build && npm run start
```

## Replacing the AI Stub

Edit `app/api/analyze/route.ts` — swap the `setTimeout` mock delay for a real API call (OpenAI Vision, AWS Rekognition, etc.). The response shape must match `types/index.ts → ShoeAnalysis`.
