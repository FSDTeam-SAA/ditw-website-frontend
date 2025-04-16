"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  itemname: string;
  itemlink: string;
  itemname2: string;
  itemlink2: string;
  itemname3: string;
  itemlink3: string;
  itemname4: string;
  itemlink4: string;
  image: File | null;
}

interface FormErrors {
  itemname?: string;
  itemlink?: string;
  itemname2?: string;
  itemlink2?: string;
  itemname3?: string;
  itemlink3?: string;
  itemname4?: string;
  itemlink4?: string;
  image?: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    itemname: "",
    itemlink: "",
    itemname2: "",
    itemlink2: "",
    itemname3: "",
    itemlink3: "",
    itemname4: "",
    itemlink4: "",
    image: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));

    // Clear previous error
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Item name validation
    if (!formData.itemname.trim()) {
      newErrors.itemname = "Item name is required";
    }

    // Item link validation - should include a # character
    if (formData.itemlink && !formData.itemlink.includes("#")) {
      newErrors.itemlink = "Item link must include a # character";
    }

    // Item name 2 validation (if provided)
    if (formData.itemname2 && !formData.itemlink2) {
      newErrors.itemlink2 = "Item link is required when item name is provided";
    }

    // Item link 2 validation (if provided)
    if (formData.itemlink2 && !formData.itemlink2.includes("#")) {
      newErrors.itemlink2 = "Item link must include a # character";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formPayload = new FormData();
      formPayload.append("itemname1", formData.itemname);
      formPayload.append("itemlink1", formData.itemlink);
      formPayload.append("itemname2", formData.itemname2);
      formPayload.append("itemlink2", formData.itemlink2);
      formPayload.append("itemname3", formData.itemname3);
      formPayload.append("itemlink3", formData.itemlink3);
      formPayload.append("itemname4", formData.itemname4);
      formPayload.append("itemlink4", formData.itemlink4);
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzQ0NzE1MzE0LCJleHAiOjE3NDQ3MTg5MTQsIm5iZiI6MTc0NDcxNTMxNCwianRpIjoiZVpLWGtoYnpVTEo1UWk4aSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.CLR5rgYxCUu0e_NT8VlAQEX1MapXJHvE1zK2MaL8-V4`,
            },

            body: formPayload,
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong while submitting the form.");
        }

        const result = await response.json();
        console.log("Server response:", result);

        // Reset the form
        setFormData({
          itemname: "",
          itemlink: "",
          itemname2: "",
          itemlink2: "",
          itemname3: "",
          itemlink3: "",
          itemname4: "",
          itemlink4: "",
          image: null,
        });
        setImagePreview(null);

        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit form. Check console for details.");
      }
    } else {
      console.log("Form has validation errors");
    }
  };


  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Header</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
         {/* Image upload  */}
        <div className="space-y-2">
          <Label htmlFor="image">Upload logo</Label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {imagePreview ? (
              <div className="space-y-2">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-40 mx-auto object-contain"
                />
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload an image
                </p>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">{errors.image}</p>
          )}
        </div>

        {/* Text inputs  */}
        <div className="">
          <h1 className="py-4 text-[20px] font-medium">Header menu item</h1>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="itemname"
                  name="itemname"
                  value={formData.itemname}
                  placeholder="Item name"
                  onChange={handleInputChange}
                  className={errors.itemname ? "border-red-500" : ""}
                />
                {errors.itemname && (
                  <p className="text-sm text-red-500 mt-1">{errors.itemname}</p>
                )}
              </div>
              <div>
                <Input
                  id="itemlink"
                  name="itemlink"
                  placeholder="#Itemlink"
                  value={formData.itemlink}
                  onChange={handleInputChange}
                  className={errors.itemlink ? "border-red-500" : ""}
                />
                {errors.itemlink && (
                  <p className="text-sm text-red-500 mt-1">{errors.itemlink}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="itemname2"
                  name="itemname2"
                  placeholder="Item name"
                  value={formData.itemname2}
                  onChange={handleInputChange}
                  className={errors.itemname2 ? "border-red-500" : ""}
                />
                {errors.itemname2 && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.itemname2}
                  </p>
                )}
              </div>
              <div>
                <Input
                  id="itemlink2"
                  name="itemlink2"
                  placeholder="#Itemlink"
                  value={formData.itemlink2}
                  onChange={handleInputChange}
                  className={errors.itemlink2 ? "border-red-500" : ""}
                />
                {errors.itemlink2 && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.itemlink2}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="itemname3"
                  name="itemname3"
                  value={formData.itemname3}
                  placeholder="Item name"
                  onChange={handleInputChange}
                  className={errors.itemname3 ? "border-red-500" : ""}
                />
                {errors.itemname3 && (
                  <p className="text-sm text-red-500 mt-1">{errors.itemname3}</p>
                )}
              </div>
              <div>
                <Input
                  id="itemlink3"
                  name="itemlink3"
                  placeholder="#Itemlink"
                  value={formData.itemlink3}
                  onChange={handleInputChange}
                  className={errors.itemlink3 ? "border-red-500" : ""}
                />
                {errors.itemlink3 && (
                  <p className="text-sm text-red-500 mt-1">{errors.itemlink3}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="itemname4"
                  name="itemname4"
                  placeholder="Item name"
                  value={formData.itemname4}
                  onChange={handleInputChange}
                  className={errors.itemname4 ? "border-red-500" : ""}
                />
                {errors.itemname4 && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.itemname4}
                  </p>
                )}
              </div>
              <div>
                <Input
                  id="itemlink4"
                  name="itemlink4"
                  placeholder="#Itemlink"
                  value={formData.itemlink4}
                  onChange={handleInputChange}
                  className={errors.itemlink4 ? "border-red-500" : ""}
                />
                {errors.itemlink4 && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.itemlink4}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors above before submitting the form.
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Submit Form
        </Button>
      </form>
    </div>
  );
}
