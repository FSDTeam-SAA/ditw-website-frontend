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
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/ColorPicker";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 10 characters.",
  }),
  backgroundColor: z.string().min(4, {
    message: "Please pick a background color.",
  }),
});

const ContactUsBg = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { data: session } = useSession();

  const token = (session?.user as { token?: string })?.token;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      backgroundColor: "",
    },
  });

  const handleColorChange = (backgroundColor: string) => {
    setSelectedColor(backgroundColor);
    form.setValue("backgroundColor", backgroundColor);
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
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    formData.append("backgroundColor", selectedColor);
    console.log(formData);

    mutate(formData);
  };

  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border shadow-lg p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-black text-center">
            Contact Us Background
          </h2>

          <div className="">
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
          <div className="mt-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input className="border" placeholder="Enter a Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          <div>
          <Label className="text-base font-bold text-black">
                Background Color
              </Label>
              <ColorPicker
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                previousColor={selectedColor}
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
  );
};

export default ContactUsBg;
