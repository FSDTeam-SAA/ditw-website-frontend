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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "heading must be at least 2 characters.",
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
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
  title7: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
});

type ManagedFeatureResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    heading: string;
    title: string;
    icon: string;
    title1: string;
    icon1: string;
    title2: string;
    icon2: string;
    title3: string;
    icon3: string;  
    icon4: string;
    title4: string;
    icon5: string;
    title5: string;
    icon6: string;
    title6: string;
    icon7: string;
    title7: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const ManagedFeature = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const { data, isLoading, isError, error } = useQuery<ManagedFeatureResponse>({
    queryKey: ["managed-feature-items"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/managedservices/projectmanagement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [icon1, setIcon1] = useState<File | null>(null);
  const [icon2, setIcon2] = useState<File | null>(null);
  const [icon3, setIcon3] = useState<File | null>(null);
  const [icon4, setIcon4] = useState<File | null>(null);
  const [icon5, setIcon5] = useState<File | null>(null);
  const [icon6, setIcon6] = useState<File | null>(null);
  const [icon7, setIcon7] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      title: "",
      title1: "",
      title2: "",
      title3: "",
      title4: "",
      title5: "",
      title6: "",
      title7: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        heading: data.data.heading || "",
        title: data.data.title || "",
        title1: data.data.title1 || "",
        title2: data.data.title2 || "",
        title3: data.data.title3 || "",
        title4: data.data.title4 || "",
        title5: data.data.title5 || "",
        title6: data.data.title6 || "",
        title7: data.data.title7 || "",
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["powered-by-mrpc"],
    mutationFn: (formData: FormData) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/managedservices/poweredbymrpc`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      ).then((res) => res.json()),

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
    formData.append("heading", values.heading);
    formData.append("title", values.title);
    formData.append("title1", values.title1);
    formData.append("title2", values.title2);
    formData.append("title3", values.title3);
    formData.append("title4", values.title4);
    formData.append("title5", values.title5);
    formData.append("title6", values.title6);
    formData.append("title7", values.title7);
    if (icon) {
      formData.append("icon", icon);
    }
    if (icon1) {
      formData.append("icon1", icon1);
    }
    if (icon2) {
      formData.append("icon2", icon2);
    }
    if (icon3) {
      formData.append("icon3", icon3);
    }
    if (icon4) {
      formData.append("icon4", icon4);
    }
    if (icon5) {
      formData.append("icon5", icon5);
    }
    if (icon6) {
      formData.append("icon6", icon6);
    }
    if (icon7) {
      formData.append("icon7", icon7);
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
              Managed Services Feature
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                {/* first part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon}
                      setFile={setIcon}
                      existingUrl={data?.data?.icon}
                    />
                  </div>
                  <div className="pt-4">
                    {/* title */}
                    <FormField
                      control={form.control}
                      name="title"
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
                      file={icon1}
                      setFile={setIcon1}
                      existingUrl={data?.data?.icon1}
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
                {/* three part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon2}
                      setFile={setIcon2}
                      existingUrl={data?.data?.icon2}
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
                {/* foure part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon3}
                      setFile={setIcon3}
                      existingUrl={data?.data?.icon3}
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
              </div>
              <div className="md:col-span-1">
                {/* five part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon4}
                      setFile={setIcon4}
                      existingUrl={data?.data?.icon4}
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
                {/* six part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon5}
                      setFile={setIcon5}
                      existingUrl={data?.data?.icon5}
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
                {/* seven part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon6}
                      setFile={setIcon6}
                      existingUrl={data?.data?.icon6}
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
                {/* eight part  */}
                <div>
                  <div>
                    <FileUpload
                      type="image"
                      label="Add Icon"
                      file={icon7}
                      setFile={setIcon7}
                      existingUrl={data?.data?.icon7}
                    />
                  </div>
                  <div className="pt-4">
                    {/* title */}
                    <FormField
                      control={form.control}
                      name="title7"
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
              </div>
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

export default ManagedFeature;
