"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  email_address: z.string().email("Invalid email_address"),
  company_name: z.string().min(1, "Company name is required"),
  comments: z.string().min(1, "Comments are required"),
});

export default function ContactForm() {
  // const { data: session } = useSession();
  // const token = (session?.user as { token?: string })?.token;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email_address: "",
      company_name: "",
      comments: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["contact-message"],
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactMessage`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          body: formData,
        }
      );

      return response.json();
    },

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();

      toast.success(data.message || "Submitted successfully!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone_number", values.phone_number);
    formData.append("email_address", values.email_address);
    formData.append("company_name", values.company_name);
    formData.append("comments", values.comments);

    mutate(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First row */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    placeholder="*First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    placeholder="*Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Second row */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    type="tel"
                    placeholder="*Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    placeholder="*Company Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Third row - Email (spans full width on mobile, half on desktop) */}
          <FormField
            control={form.control}
            name="email_address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Input
                    className="h-10 w-full"
                    type="email_address"
                    placeholder="*Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Fourth row - Comments (spans full width) */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea
                    placeholder="*Comments/Questions"
                    className="min-h-24 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full sm:w-auto sm:min-w-[200px] bg-[#1d0fbf] hover:bg-[#2a1cc7]"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
