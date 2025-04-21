import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Heading must be at least 2 characters.",
  }),
  content: z.string().refine((val) => val.trim().split(/\s+/).length <= 25, {
    message: "Review content must not exceed 200 words",
  }),
  star: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Minimum star is 1")
    .max(5, "Maximum star is 5"),
});

const EditReview = ({
  open,
  onOpenChange,
  reviewId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId?: string | null;
}) => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token);

  console.log(reviewId);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      star: 1,
    },
  });

  React.useEffect(() => {
    if (!reviewId) return;
    const fetchReviewDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review-data/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const review = await res.json();
        if (review?.data) {
          form.reset({
            name: review.data.name,
            content: review.data.content,
            star: review.data.star,
          });
        }
      } catch (error: Error | unknown) {
        toast.error("Failed to load review data.");
        console.log(error);
      }
    };

    fetchReviewDetails();
  }, [reviewId, token, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["review-update"],
    mutationFn: (values: z.infer<typeof formSchema>) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review-data/${reviewId}`,
        {
          method: "PUT", // or PATCH if you're doing partial updates
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      ).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      form.reset();
      toast.success(data.message || "Updated successfully!");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["all-review-data"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <div>
      <div>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-black text-center">
                  Review content
                </h2>
                {/* first part  */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="md:col-span-1">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold text-black">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <FormField
                      control={form.control}
                      name="star"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1 to 5)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={5}
                              placeholder="Enter a star"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => {
                      const wordCount =
                        field.value?.trim().split(/\s+/).length || 0;
                      return (
                        <FormItem>
                          <FormLabel className="text-base font-bold text-black">
                            Review Content
                          </FormLabel>
                          <FormControl>
                            <div>
                              <Textarea
                                placeholder="Enter a review content"
                                {...field}
                                onChange={(e) => {
                                  const words = e.target.value
                                    .trim()
                                    .split(/\s+/);
                                  if (words.length <= 25) {
                                    field.onChange(e);
                                  }
                                }}
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                {wordCount}/100 words
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-lg font-bold px-10 py-2"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Updating..." : "Update"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditReview;
