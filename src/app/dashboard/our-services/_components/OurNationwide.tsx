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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  subTitle: z.string().min(5, {
    message: "sub title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  buttonTitle: z.string().min(10, {
    message: "button Title must be at least 5 characters.",
  }),
  buttonName: z.string().min(2, {
    message: "button name must be at least 2 characters.",
  }),
  buttonUrl: z.string().min(2, {
    message: "button url must be at least 2 characters.",
  }),
});

const OurNationwide = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      description: "",
      buttonTitle: "",
      buttonName: "",
      buttonUrl: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="p-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">Our Service Heading
            </h2>
            {/* title  */}
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
            {/* sub title  */}
            <FormField
              control={form.control}
              name="subTitle"
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
            {/* description  */}
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
            {/* Button Title  */}
            <FormField
              control={form.control}
              name="buttonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Button Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Button Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* button  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* button name  */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="buttonName"
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
              </div>
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="buttonUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Button Url
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Button Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="bg-blue-500 text-lg font-bold px-10 py-2"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OurNationwide;
