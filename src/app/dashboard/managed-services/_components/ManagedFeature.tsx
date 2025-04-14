"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FileUpload from "@/components/ui/FileUpload";

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "heading must be at least 2 characters.",
  }),
  title1: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  title2: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  title3: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  title4: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  title5: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  title6: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
});

const ManagedFeature = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);
  const [image5, setImage5] = useState<File | null>(null);
  const [image6, setImage6] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      title1: "",
      title2: "",
      title3: "",
      title4: "",
      title5: "",
      title6: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Create a complete form data object including files
    const formData = {
      ...values,
      image1: image1
        ? {
            name: image1.name,
            type: image1.type,
            size: image1.size,
          }
        : null,
      image2: image2
        ? {
            name: image2.name,
            type: image2.type,
            size: image2.size,
          }
        : null,
      image3: image3
        ? {
            name: image3.name,
            type: image3.type,
            size: image3.size,
          }
        : null,
      image4: image4
        ? {
            name: image4.name,
            type: image4.type,
            size: image4.size,
          }
        : null,
      image5: image5
        ? {
            name: image5.name,
            type: image5.type,
            size: image5.size,
          }
        : null,
      image6: image6
        ? {
            name: image6.name,
            type: image6.type,
            size: image6.size,
          }
        : null,
    };

    // Log the complete form data to console
    console.log("Form submission data:", formData);

    setIsSubmitting(false);
  }

  return (
    <div className="px-10 pb-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              PROJECT MANAGEMENT
            </h2>
            {/* heading  */}
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Heading
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a Heading" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* first part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image1}
                  setFile={setImage1}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* two part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image2}
                  setFile={setImage2}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* three part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image3}
                  setFile={setImage3}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* foure part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image4}
                  setFile={setImage4}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* five part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image5}
                  setFile={setImage5}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* six part  */}
            <div>
              <div>
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={image6}
                  setFile={setImage6}
                />
              </div>
              <div className="pt-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
        </Form>
      </div>
    </div>
  );
};

export default ManagedFeature;
