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
  name: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  reviewContent: z.string().min(10, {
    message: "First Description must be at least 10 characters.",
  }),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
});

const ReviewCart = () => {
  const [star, setStar] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      reviewContent: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Create a complete form data object including files
    const formData = {
      ...values,
      image: image
        ? {
            name: image.name,
            type: image.type,
            size: image.size,
          }
        : null,
      star: star
        ? {
            name: star.name,
            type: star.type,
            size: star.size,
          }
        : null,
    };

    // Log the complete form data to console
    console.log("Form submission data:", formData);

    setIsSubmitting(false);
  }

  return (
    <div className="p-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              Review content
            </h2>
            {/* first part  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="reviewContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Review Content
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a review Content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1 to 5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        placeholder="Enter a rating"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* image part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Star"
                  file={star}
                  setFile={setStar}
                />
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Background Image"
                  file={image}
                  setFile={setImage}
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

export default ReviewCart;
