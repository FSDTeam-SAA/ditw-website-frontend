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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().min(5, {
    message: "Subtitle must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  button_name: z.string().min(2, {
    message: "Button name must be at least 2 characters.",
  }),
  button_url: z.string().min(2, {
    message: "Button URL must be at least 2 characters.",
  }),
});

const FirstForm = () => {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;
  // console.log(token)
  // const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      button_name: "",
      button_url: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["about-us-first-form"],
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aboutus`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      return response.json();
    },

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        });
        return;
      }
      form.reset();
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
      // queryClient.invalidateQueries({ queryKey: ["first-form"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("description", values.description);
    formData.append("button_name", values.button_name);
    formData.append("button_url", values.button_url);

    mutate(formData);
  }

  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 border shadow-lg p-10 rounded-lg"
        >
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
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subtitle */}
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

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold text-black">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a detailed description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Button Name */}
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

            {/* Button URL */}
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
            disabled={isPending}
              className="bg-blue-500 text-lg font-bold px-10 py-2"
              type="submit"
            >
              {isPending ? "Submitting" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstForm;
