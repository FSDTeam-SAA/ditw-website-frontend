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
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  subTitle: z.string().min(6, {
    message: "subTitle must be at least 10 characters.",
  }),
  buttonName: z.string().min(2, {
    message: "button name must be at least 2 characters.",
  }),
  buttonUrl: z.string().min(2, {
    message: "button url must be at least 2 characters.",
  }),
  backgroundColor: z.string().min(4, {
    message: "Please pick a background color.",
  }),
});

const ContactUsHeading = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [formData, setFormData] = useState<{ backgroundColor: string }>({
    backgroundColor: "",
  });

  console.log(setFormData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      buttonName: "",
      buttonUrl: "",
      backgroundColor: "",
    },
  });

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    form.setValue("backgroundColor", color); // Update form value directly
  };

  // const handleColorChange = (color: string) => {
  //   setSelectedColor(color);
  //   setFormData((prev) => ({ ...prev, backgroundColor: color }));
  // };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const fullData = {
      ...values,
      backgroundColor: selectedColor,
    };
    console.log(fullData);
    // console.log(values);
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
                previousColor={formData.backgroundColor}
              />
            </div>
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

export default ContactUsHeading;
