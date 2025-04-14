"use client";

import type React from "react";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface FileUploadProps {
  type: "image" | "video";
  label: string;
  file: File | null | string;
  setFile: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  type,
  label,
  file,
  setFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Create and clean up object URLs for previews
  useEffect(() => {
    if (file && typeof file !== "string" && file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Clean up the URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (typeof file === "string") {
      setPreview(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;

    if (type === "image" && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    } else if (type === "video" && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    } else {
      alert(`Please upload a valid ${type} file`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (type === "image" && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else if (type === "video" && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    } else {
      alert(`Please upload a valid ${type} file`);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-bold text-black">
        {label}
      </Label>
      <div
        className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:bg-accent/50 ${
          file ? "border-primary" : "border-muted-foreground/25"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        style={{ height: "160px" }}
      >
        {file ? (
          <div className="relative h-full flex items-center justify-center">
            {type === "image" ? (
              <Image
                src={preview || "/placeholder.svg?height=200&width=200"}
                width={200}
                height={200}
                alt="Preview"
                className="mx-auto max-h-32 rounded object-contain"
              />
            ) : (
              <video
                src={preview || ""}
                className="mx-auto max-h-32 rounded"
                controls
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2"
              onClick={() => setFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-1 text-sm text-muted-foreground">
              Drag and drop a {type} here or
            </p>
            <label className="cursor-pointer text-sm text-primary hover:underline">
              Click to Upload
              <input
                type="file"
                className="hidden"
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={handleFileSelect}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
