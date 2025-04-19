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
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().min(6, {
    message: "Subtitle must be at least 6 characters.",
  }),
  button_name: z.string().min(2, {
    message: "Button name must be at least 2 characters.",
  }),
  button_url: z.string().min(2, {
    message: "Button URL must be at least 2 characters.",
  }),
  color: z.string().min(6, {
    message: "Please pick a background color.",
  }),
});

type ContactInfoResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    button_name: string;
    button_url: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};


const ContactUsHeading = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const [selectedColor, setSelectedColor] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery<ContactInfoResponse>({
    queryKey: ["contact-us-heading"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  // console.log(data?.data.color)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      button_name: "",
      button_url: "",
      color: "",
    },
  });

  useEffect(() => {
      if (data?.data) {
        form.reset({
          title: data.data.title || "",
          subtitle: data.data.subtitle || "",
          button_name: data.data.button_name || "",
          button_url: data.data.button_url || "",
          color: data.data.color || "",
        });
      }
    }, [data, form]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    form.setValue("color", color);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["contact-us-heading"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
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
          richColors: true,
        });
        return;
      }
      form.reset();
      setSelectedColor("");
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("button_name", values.button_name);
    formData.append("button_url", values.button_url);
    formData.append("color", selectedColor);

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
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              Contact Us Heading
            </h2>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <ColorPicker
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                previousColor={selectedColor}
              />
            </div>

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
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* subtitle */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Sub Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sub Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* button name and url */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="button_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Button Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Button Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="button_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Button URL
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Button URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-lg font-bold px-10 py-2"
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

export default ContactUsHeading;
