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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "First Description must be at least 10 characters.",
  }),
});

type MRPCResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    description: string;
    img: string;
    logo: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const PoweredByMrpc = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<MRPCResponse>({
    queryKey: ["powered-by-mrpc"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/managedservices/poweredbymrpc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [img, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        description: data.data.description || "",
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
        setLogo(null);
        setImage(null);
  
        toast.success(data.message || "Submitted successfully!");
  
        queryClient.invalidateQueries({ queryKey: ["powered-by-mrpc"] });
      },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (logo) {
      formData.append("logo", logo);
    }
    if (img) {
      formData.append("img", img);
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
    <div className="p-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              Powered By MrPc
            </h2>
            {/* first part  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
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
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* image part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Logo"
                  file={logo}
                  setFile={setLogo}
                  existingUrl={data?.data?.logo}
                />
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Image"
                  file={img}
                  setFile={setImage}
                  existingUrl={data?.data?.img}
                />
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

export default PoweredByMrpc;
