"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2 } from "lucide-react"
import Image from "next/image"

export default function EditContentForm() {
  const [title, setTitle] = useState("My Awesome Project")
  const [subtitle, setSubtitle] = useState("A brief tagline goes here")
  const [description, setDescription] = useState(
    "This is a detailed description of the project. You can write multiple paragraphs here.",
  )
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the data to your backend
    const logoName = logo?.name
    
    console.log({
      title,
      subtitle,
      description,
      logoName,
    })

    setIsSubmitting(false)
  }

  return (
    <Card className="w-full h-screen mx-auto shadow-md">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Edit Banner</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base">
              Title
            </Label>
            <Input
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="subtitle" className="text-sm sm:text-base">
              Subtitle
            </Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="description" className="text-sm sm:text-base">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
              className="text-sm sm:text-base min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm sm:text-base">
              Background Image
            </Label>
            <div className="flex flex-col items-center gap-3 sm:gap-4 sm:flex-row">
              <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-md border border-dashed">
                {logoPreview ? (
                  <Image
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="h-full w-full p-2"
                  />
                ) : (
                  <ImagePlus className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 w-full">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="cursor-pointer w-full"
                />
              
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6">
          <Button type="submit" className="w-[200px] text-sm sm:text-base py-2 sm:py-2.5" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
