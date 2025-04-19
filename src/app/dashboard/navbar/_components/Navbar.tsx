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
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import FileUpload from "@/components/ui/FileUpload";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

// data type
type NavbarResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    logo: string; // URL to logo image
    back_img: string; // URL to background image
    itemname1: string;
    itemlink1: string;
    itemname2: string;
    itemlink2: string;
    itemname3: string;
    itemlink3: string;
    itemname4: string;
    itemlink4: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
};

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
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  const [logo, setLogo] = useState<File | null>(null);
  const [back_img, setBackImage] = useState<File | null>(null);

  const { data, isLoading, isError, error } = useQuery<NavbarResponse>({
    queryKey: ["navbar"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  

  // console.log(data?.data?.itemname1);

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

  useEffect(() => {
    if (data?.data) {
      form.reset({
        itemname1: data.data.itemname1 || "",
        itemlink1: data.data.itemlink1 || "",
        itemname2: data.data.itemname2 || "",
        itemlink2: data.data.itemlink2 || "",
        itemname3: data.data.itemname3 || "",
        itemlink3: data.data.itemlink3 || "",
        itemname4: data.data.itemname4 || "",
        itemlink4: data.data.itemlink4 || "",
      });
    }
  }, [data, form]);

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
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();
      setLogo(null);
      setBackImage(null);

      toast.success(data.message || "Submitted successfully!");
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (logo) formData.append("logo", logo);
    if (back_img) formData.append("back_img", back_img);

    console.log("form summitted successfully", formData);

    mutate(formData);
  };

  if(isLoading){
    return <Loading/>
  }
  else if (isError) {
    <div className="w-full h-[500px]">
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
  } 
  // else if (data && data.data && data.data.length === 0) {
  //   <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
  // }

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
              existingUrl={data?.data?.logo}
            />
            <FileUpload
              type="image"
              label="Add Background Image"
              file={back_img}
              setFile={setBackImage}
              existingUrl={data?.data?.back_img}
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
                    <FormLabel className="text-base font-bold text-black">Item Name {i}</FormLabel>
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
                    <FormLabel className="text-base font-bold text-black">Item Link {i}</FormLabel>
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
