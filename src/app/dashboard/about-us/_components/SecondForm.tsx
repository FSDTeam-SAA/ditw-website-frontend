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
import { useEffect, useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

const formSchema = z.object({
  title1: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description1: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title2: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description2: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title3: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description3: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title4: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description4: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title5: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description5: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type AboutUsSecondResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    title1: string;
    description1: string;
    icon1: string;
    title2: string;
    description2: string;
    icon2: string;
    title3: string;
    description3: string;
    icon3: string;
    title4: string;
    description4: string;
    icon4: string;
    title5: string;
    description5: string;
    icon5: string;
    img: string;
    video: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
};


const SecondForm = () => {
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [icon1, setIcon1] = useState<File | null>(null);
  const [icon2, setIcon2] = useState<File | null>(null);
  const [icon3, setIcon3] = useState<File | null>(null);
  const [icon4, setIcon4] = useState<File | null>(null);
  const [icon5, setIcon5] = useState<File | null>(null);

  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<AboutUsSecondResponse>({
    queryKey: ["about-us-second-form"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aboutus-section2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title1: "",
      description1: "",
      title2: "",
      description2: "",
      title3: "",
      description3: "",
      title4: "",
      description4: "",
      title5: "",
      description5: "",
    },
  });

  useEffect(() => {
      if (data?.data) {
        form.reset({
          title1: data.data.title1 || "",
          description1: data.data.description1 || "",
          title2: data.data.title2 || "",
          description2: data.data.description2 || "",
          title3: data.data.title3 || "",
          description3: data.data.description3 || "",
          title4: data.data.title4 || "",
          description4: data.data.description4 || "",
          title5: data.data.title5 || "",
          description5: data.data.description5 || "",
        });
      }
    }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["aboutUs-secondForm"],
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/aboutus-section2`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log(response);

      return response.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();
      setImg(null);
      setVideo(null);
      setIcon1(null);
      setIcon2(null);
      setIcon3(null);
      setIcon4(null);
      setIcon5(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["about-us-second-form"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {

    const formData = new FormData();

    formData.append("title1", values.title1);
    formData.append("title2", values.title2);
    formData.append("title3", values.title3);
    formData.append("title4", values.title4);
    formData.append("title5", values.title5);
    formData.append("description1", values.description1);
    formData.append("description2", values.description2);
    formData.append("description3", values.description3);
    formData.append("description4", values.description4);
    formData.append("description5", values.description5);
    if(icon1){
      formData.append("icon1", icon1)
    }
    if(icon2){
      formData.append("icon2", icon2)
    }
    if(icon3){
      formData.append("icon3", icon3)
    }
    if(icon4){
      formData.append("icon4", icon4)
    }
    if(icon5){
      formData.append("icon5", icon5)
    }
    if(img){
      formData.append("img", img)
    }
    if(video){
      formData.append("video", video)
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
    <div className="px-10 pb-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border shadow-lg p-10 rounded-lg"
          >
            {/* first part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title1"
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

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description1"
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
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon1}
                  setFile={setIcon1}
                  existingUrl={data?.data?.icon1}
                />
              </div>
            </div>
            {/* two part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title2"
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

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description2"
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
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon2}
                  setFile={setIcon2}
                  existingUrl={data?.data?.icon2}
                />
              </div>
            </div>
            {/* three part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title3"
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

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description3"
                            className="min-h-[100px]"
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
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon3}
                  setFile={setIcon3}
                  existingUrl={data?.data?.icon3}
                />
              </div>
            </div>
            {/* four part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title4"
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

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description4"
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
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon4}
                  setFile={setIcon4}
                  existingUrl={data?.data?.icon4}
                />
              </div>
            </div>
            {/* five part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title5"
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

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description5"
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
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Icon"
                  file={icon5}
                  setFile={setIcon5}
                  existingUrl={data?.data?.icon5}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 shadow-lg p-6 border rounded-lg">
              <FileUpload
                type="image"
                label="Add Image"
                file={img}
                setFile={setImg}
                existingUrl={data?.data?.img}
              />
              <FileUpload
                type="video"
                label="Add Video"
                file={video}
                setFile={setVideo}
                existingUrl={data?.data?.video}
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
    </div>
  );
};

export default SecondForm;
