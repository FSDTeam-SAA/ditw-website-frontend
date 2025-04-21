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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
});

type serviceSupportDataType = {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    icon: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const ManagementItSupport = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<serviceSupportDataType>({
    queryKey: ["services-support"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/support`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const [icon, setIcon] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["management-it-support"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/support`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();
      setIcon(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["services-support"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    if (icon) {
      formData.append("icon", icon);
    }
    formData.append("title", values.title);

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
              MANAGED IT SUPPORT SERVICES
            </h2>
            {/* first part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
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
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon}
                  setFile={setIcon}
                  existingUrl={data?.data?.icon}
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

export default ManagementItSupport;
