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
import { useEffect, useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  email: z.string().min(6, {
    message: "email must be needed",
  }),
  phone: z.string().min(6, {
    message: "phone Number must be at least 11 characters.",
  }),
  copyright: z.string().min(6, {
    message: "copy right message must be needed",
  }),
});

type ContactDetailsResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    heading: string;
    email: string;
    phone: string;
    email_icon: string | null;
    phone_icon: string | null;
    copyright: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const OurContact = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const [email_icon, setEmailIcon] = useState<File | null>(null);
  const [phone_icon, setPhoneIcon] = useState<File | null>(null);

  const { data, isLoading, isError, error } = useQuery<ContactDetailsResponse>({
    queryKey: ["our contact"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ourcontact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      email: "",
      copyright : "",
      phone : "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        heading: data.data.heading || "",
        email: data.data.email || "",
        copyright: data.data.copyright || "",
        phone: data.data.phone || "",

      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["our contact"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ourcontact`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
        });
        return;
      }
      form.reset();
      toast.success(data.message, {
        position: "top-right",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("heading", values.heading);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("copyright", values.copyright);

    if (email_icon) {
      formData.append("email_icon", email_icon);
    }
    if (phone_icon) {
      formData.append("phone_icon", phone_icon);
    }

    // Log the complete form data to console
    console.log("Form submission data:", formData);
    mutate(formData);
  }

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
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
                          Email
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
                    file={email_icon}
                    setFile={setEmailIcon}
                    existingUrl={data?.data?.email_icon}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <div>
                  {/* phone number */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Phone Number
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
                    file={phone_icon}
                    setFile={setPhoneIcon}
                    existingUrl={data?.data?.phone_icon}
                  />
                </div>
              </div>
            </div>
            {/* copyritht message */}
            <div>
              <FormField
                control={form.control}
                name="copyright"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Copy Ritht Message
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a copy right message"
                        {...field}
                      />
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
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OurContact;
