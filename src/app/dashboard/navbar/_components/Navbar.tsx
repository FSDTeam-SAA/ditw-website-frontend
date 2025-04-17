"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import FileUpload from "@/components/ui/FileUpload";

// ✅ Zod Schema with optional fields properly validated
const formSchema = z.object({
  itemname1: z.string().min(1, "Item name is required"),
  itemlink1: z
    .string()
    .min(1, "Item link is required")
    .refine((val) => val.includes("#"), {
      message: "Item link must include a # character",
    }),

  itemname2: z.string().optional(),
  itemlink2: z
    .string()
    .optional()
    .refine((val) => !val || val.includes("#"), {
      message: "Item link must include a # character",
    }),

  itemname3: z.string().optional(),
  itemlink3: z
    .string()
    .optional()
    .refine((val) => !val || val.includes("#"), {
      message: "Item link must include a # character",
    }),

  itemname4: z.string().optional(),
  itemlink4: z
    .string()
    .optional()
    .refine((val) => !val || val.includes("#"), {
      message: "Item link must include a # character",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Navbar() {
  const { data } = useSession();
  const token = (data?.user as { token?: string })?.token || "";

  const [logo, setLogo] = useState<File | null>(null);
  const [back_img, setBackImage] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemname1: "",
      itemlink1: "",
      itemname2: "",
      itemlink2: "",
      itemname3: "",
      itemlink3: "",
      itemname4: "",
      itemlink4: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["navbar-settings"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed", {
          position: "top-right",
          richColors: true,
        });
        return;
      }

      form.reset();
      
      toast.success(data.message || "Submitted successfully!", {
        position: "top-right",
        richColors: true,
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (logo) formData.append("logo", logo);
    if (back_img) formData.append("back_img", back_img);

    console.log("form summitted successfully", formData)

    mutate(formData);
  };

  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border shadow-lg p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-black text-center">Navbar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FileUpload
              type="image"
              label="Add Logo"
              file={logo}
              setFile={setLogo}
            />
            <FileUpload
              type="image"
              label="Add Background Image"
              file={back_img}
              setFile={setBackImage}
            />
          </div>

          <h2 className="text-lg font-semibold pt-6">Header Menu Items</h2>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`itemname${i}` as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name {i}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Item name ${i}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itemlink${i}` as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Link {i}</FormLabel>
                    <FormControl>
                      <Input placeholder={`#itemlink${i}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the errors above before submitting the form.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
