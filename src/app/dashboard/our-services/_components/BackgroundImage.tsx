"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/FileUpload";

const BackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      backgroundImage: backgroundImage
        ? {
            name: backgroundImage.name,
            type: backgroundImage.type,
            size: backgroundImage.size,
          }
        : null,
    };

    console.log("Form submission data:", formData);

    setIsSubmitting(false);
  };

  return (
    <div className="p-10">
      <form
        onSubmit={onSubmit}
        className="space-y-6 border shadow-lg p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-black text-center">
          UPLOAD BACKGROUND IMAGE
        </h2>

        <div className="shadow-lg p-6 border rounded-lg">
          <FileUpload
            type="image"
            label="Add Background Image"
            file={backgroundImage}
            setFile={setBackgroundImage}
          />
        </div>

        <div className="pt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-lg font-bold px-10 py-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BackgroundImage;
