"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export interface ImageUploadProps {
  /** Initial image URL if any */
  initialImage?: string | null
  /** Function called when image is selected or removed */
  onImageChange?: (imageData: string | null) => void
  /** Maximum file size in bytes (default: 5MB) */
  maxSize?: number
  /** Accepted file types (default: image/*) */
  accept?: string
  /** Custom placeholder text */
  placeholder?: string
  /** Custom CSS class for the container */
  className?: string
  /** Whether the upload is required */
  required?: boolean
  /** ID for the input element */
  id?: string
  /** Whether to show the remove button */
  showRemoveButton?: boolean
  /** Custom error message for invalid file type */
  invalidTypeMessage?: string
  /** Custom error message for file too large */
  fileTooLargeMessage?: string
}

export function ImageUpload({
  initialImage = null,
  onImageChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/*",
  placeholder = "Click to upload an image",
  className = "",
  required = false,
  id = "image-upload",
  showRemoveButton = true,
  invalidTypeMessage = "Invalid file type. Please select an image.",
  fileTooLargeMessage = "File is too large. Maximum size is ",
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      setError(null)

      if (!file) return

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError(invalidTypeMessage)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      // Validate file size
      if (file.size > maxSize) {
        const sizeMB = Math.round(maxSize / 1024 / 1024)
        setError(`${fileTooLargeMessage}${sizeMB}MB`)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        onImageChange?.(result)
      }
      reader.readAsDataURL(file)
    },
    [maxSize, onImageChange, invalidTypeMessage, fileTooLargeMessage],
  )

  const handleRemoveImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setImagePreview(null)
      setError(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      onImageChange?.(null)
    },
    [onImageChange],
  )

  const containerClasses = `border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${className}`

  return (
    <div className="space-y-2">
      <div
        className={containerClasses}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={imagePreview ? "Change image" : "Upload image"}
      >
        {imagePreview ? (
          <div className="relative w-full max-w-xs">
            <Image src={imagePreview || "/placeholder.svg"} alt="Preview" width={100} height={100} className="mx-auto max-h-40 object-contain" />
            {showRemoveButton && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-0 right-0 rounded-full"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">{placeholder}</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleImageUpload}
          required={required && !imagePreview}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
