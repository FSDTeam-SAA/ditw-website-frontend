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
import { useEffect, useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import QuillEditor from "@/components/ui/quill-editor";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  description1: z.string().min(10, {
    message: "First Description must be at least 10 characters.",
  }),
  description2: z.string().min(10, {
    message: "Second Description must be at least 10 characters.",
  }),
});

type ManagedITServicesResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    description1: string;
    description2: string;
    img: string;
    icon1: string;
    icon2: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const ManagedIt = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  const queryClient = useQueryClient();

  const [img, setImage] = useState<File | null>(null);
  const [icon1, setIcon1] = useState<File | null>(null);
  const [icon2, setIcon2] = useState<File | null>(null);

  const { data, isLoading, isError, error } =
    useQuery<ManagedITServicesResponse>({
      queryKey: ["managed-it"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/managedservices/it`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description1: "",
      description2: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        description1: data.data.description1 || "",
        description2: data.data.description2 || "",
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["managed-it"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/managedservices/it`, {
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
      setImage(null);
      setIcon1(null);
      setIcon2(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["managed-it"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description1", values.description1);
    formData.append("description2", values.description2);

    if (icon1) {
      formData.append("icon1", icon1);
    }
    if (icon2) {
      formData.append("icon2", icon2);
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
              MANAGED IT SERVICES
            </h2>
            {/* first part  */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="md:col-span-1">
                <div>
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
                          <QuillEditor
                            id="heading"
                            value={field.value}
                            onChange={field.onChange}
                          />
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
                    name="description1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          First Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a first description"
                            className="min-h-[150px]"
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
                    name="description2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Second Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a second description"
                            className="min-h-[150px]"
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
                    file={img}
                    setFile={setImage}
                    existingUrl={data?.data?.img}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Frist Icon"
                    file={icon1}
                    setFile={setIcon1}
                    existingUrl={data?.data?.icon1}
                  />
                </div>
                <div className="pt-3">
                  <FileUpload
                    type="image"
                    label="Second Icon"
                    file={icon2}
                    setFile={setIcon2}
                    existingUrl={data?.data?.icon2}
                  />
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

export default ManagedIt;
