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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/ColorPicker";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  backgroundColor: z.string().min(4, {
    message: "Please pick a background color.",
  }),
});

type CustomerFeedbackResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    back_color: string;
    img: string | null;
    created_at: string; // ISO 8601 timestamp
    updated_at: string; // ISO 8601 timestamp
  };
};

const ReviewHeading = () => {
  const { data: session } = useSession();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [img, setImage] = useState<File | null>(null);

  const token = (session?.user as { token?: string })?.token;

  const { data, isLoading, isError, error } =
    useQuery<CustomerFeedbackResponse>({
      queryKey: ["review heading"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review/heading`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      backgroundColor: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title || "",
        backgroundColor: data.data.back_color || "",
      });
    }
  }, [data, form]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    form.setValue("backgroundColor", color);
  };

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
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        });
        return;
      }
      form.reset();
      setSelectedColor("");
      setImage(null);
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (img) {
      formData.append("img", img);
    }
    formData.append("title", values.title);

    formData.append("backgroundColor", values.backgroundColor);
    console.log(formData);

    mutate(formData);
  };

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }

  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border shadow-lg p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-black text-center">
            Review Heading
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
            <div className="md:col-span-1">
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

              <div className="pt-4">
                <Label className="text-base font-bold text-black">
                  Background Color
                </Label>
                <ColorPicker
                  selectedColor={selectedColor}
                  onColorChange={handleColorChange}
                  previousColor={selectedColor}
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <FileUpload
                type="image"
                label="Add Icon"
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
  );
};

export default ReviewHeading;
