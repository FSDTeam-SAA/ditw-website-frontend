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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  firstDescription: z.string().min(10, {
    message: "First Description must be at least 10 characters.",
  }),
  secondDescription: z.string().min(10, {
    message: "Second Description must be at least 10 characters.",
  }),
});

const ManagedIt = () => {
  const [image, setImage] = useState<File | null>(null);
  const [icon1, setIcon1] = useState<File | null>(null);
  const [icon2, setIcon2] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      firstDescription: "",
      secondDescription: "",
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
      icon1: icon1
        ? {
            name: icon1.name,
            type: icon1.type,
            size: icon1.size,
          }
        : null,
      icon2: icon2
        ? {
            name: icon2.name,
            type: icon2.type,
            size: icon2.size,
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
              MANAGED IT SERVICES
            </h2>
            {/* first part  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="heading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Heading
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-3">
                  {/* first description */}
                  <FormField
                    control={form.control}
                    name="firstDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          First Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a first description"
                            className="min-h-[230px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-3">
                  {/* second description */}
                  <FormField
                    control={form.control}
                    name="secondDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Second Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a second description"
                            className="min-h-[235px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <div>
                  <FileUpload
                    type="image"
                    label="Add Image"
                    file={image}
                    setFile={setImage}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Frist Icon"
                    file={icon1}
                    setFile={setIcon1}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Second Icon"
                    file={icon2}
                    setFile={setIcon2}
                  />
                </div>
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

export default ManagedIt;
