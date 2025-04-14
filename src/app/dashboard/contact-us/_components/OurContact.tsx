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
    message: "Heading must be at least 2 characters.",
  }),
  email: z.string().min(6, {
    message: "email must be needed",
  }),
  phoneNumber: z.string().min(6, {
    message: "phone Number must be at least 11 characters.",
  }),
  copyRightMessage: z.string().min(6, {
    message: "copy right message must be needed",
  }),
});

const OurContact = () => {
  const [emailIcon, setEmailIcon] = useState<File | null>(null);
  const [phoneIcon, setPhoneIcon] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Create a complete form data object including files
    const formData = {
      ...values,
      emailIcon: emailIcon
        ? {
            name: emailIcon.name,
            type: emailIcon.type,
            size: emailIcon.size,
          }
        : null,
      phoneIcon: phoneIcon
        ? {
            name: phoneIcon.name,
            type: phoneIcon.type,
            size: phoneIcon.size,
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
              OUR CONTACT
            </h2>
            {/* first part  */}
            <div>
              {/* heading */}
              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Heading
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a heading" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Email Icon
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Add Email Icon"
                    file={emailIcon}
                    setFile={setEmailIcon}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <div>
                  {/* phone number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Phone Number Icon
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Add Phone Icon"
                    file={phoneIcon}
                    setFile={setPhoneIcon}
                  />
                </div>
              </div>
            </div>
            {/* copyritht message */}
            <div>
              <FormField
                control={form.control}
                name="copyRightMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Copy Ritht Message
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a copy right message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
        </Form>
      </div>
    </div>
  );
};

export default OurContact;
