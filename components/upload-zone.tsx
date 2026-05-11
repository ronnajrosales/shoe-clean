"use client"

import { useState, useRef, useCallback, type DragEvent } from "react"
import { cn } from "@/lib/utils"
import { Upload, Image as ImageIcon, X } from "lucide-react"

interface UploadZoneProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export function UploadZone({ onUpload, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      setPreview(url)
      onUpload(file)
    },
    [onUpload]
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  if (preview) {
    return (
      <div className="relative w-full">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview of your uploaded shoe"
            className="w-full h-64 object-cover"
          />
        </div>
        <button
          onClick={() => setPreview(null)}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer bg-secondary/20",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-secondary/30"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        disabled={isLoading}
      />

      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <div
          className={cn(
            "h-14 w-14 rounded-full flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
          )}
        >
          {isDragging ? (
            <ImageIcon className="h-6 w-6" />
          ) : (
            <Upload className="h-6 w-6" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {isDragging ? "Drop your photo here" : "Upload a photo of your shoes"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Drag & drop or tap to browse — PNG, JPG up to 10MB
          </p>
        </div>
      </div>
    </div>
  )
}
