"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { NavbarResponse } from "@/components/types/NavbarDataType";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email_address: z.string().email({ message: "Invalid email address." }),
  phone_number: z
    .string()
    .min(2, { message: "Phone Number must be at least 2 characters." }),
  company_name: z
    .string()
    .min(2, { message: "Company Name must be at least 2 characters." }),
  customer_address: z
    .string()
    .min(2, { message: "Customer Address must be at least 2 characters." }),
  site_location: z
    .string()
    .min(2, { message: "Site Location must be at least 2 characters." }),
  type_of_service: z
    .string()
    .min(2, { message: "Type of Service must be at least 2 characters." }),
  project_description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  building_plans: z.string(),

  upload_building_plans: z
    .any()
    .nullable()
    .refine((files) => !files || files instanceof FileList, {
      message: "Invalid file input.",
    })
    .refine((files) => !files || files.length === 1, {
      message: "Please upload exactly one PDF file.",
    })
    .refine((files) => !files || files[0].type === "application/pdf", {
      message: "Only PDF files are allowed.",
    }),

  requested_time_and_date: z
    .string()
    .min(2, { message: "Date and Time must be at least 2 characters." }),
  start_date: z
    .string()
    .min(2, { message: "Date must be at least 2 characters." }),
  budget_range: z
    .string()
    .min(2, { message: "Budget Range must be at least 2 characters." }),
  how_do_you_know_about_us: z
    .string()
    .min(2, { message: "About Us must be at least 2 characters." }),
});

const typeOfServiceOptions = [
  { id: 1, name: "Access & Alarms", value: "Access & Alarms" },
  { id: 2, name: "A/V Systems", value: "A/V Systems" },
  { id: 3, name: "Digital Signage", value: "Digital Signage" },
  { id: 4, name: "Fiber Cabling", value: "Fiber Cabling" },
  { id: 5, name: "Kiosk / ATM", value: "Kiosk / ATM" },
  { id: 6, name: "Low Voltage Cabling", value: "Low Voltage Cabling" },
  { id: 7, name: "Managed Services", value: "Managed Services" },
  { id: 8, name: "New Construction", value: "New Construction" },
  { id: 9, name: "Point of Sale", value: "Point of Sale" },
  {
    id: 10,
    name: "Preventative Maintenance",
    value: "Preventative Maintenance",
  },
  { id: 11, name: "Server & Networking", value: "Server & Networking" },
  { id: 12, name: "Structured Cabling", value: "Structured Cabling" },
  { id: 13, name: "Surveillance Equipment", value: "Surveillance Equipment" },
  { id: 14, name: "Telecom", value: "Telecom" },
  { id: 15, name: "Overhead Paging System", value: "Overhead Paging System" },
  {
    id: 16,
    name: "On-site Support",
    value: "On-site Support",
  },
];

const budgetRangeOptions = [
  { id: 1, name: "Under $1,000", value: "under-1000" },
  { id: 2, name: "$1,000 - $5,000", value: "1000-5000" },
  { id: 3, name: "$5,000 - $10,000", value: "5000-10000" },
  { id: 4, name: "Over $10,000", value: "over-10000" },
];
const howDoYouHearAboutUs = [
  { id: 1, name: "Google", value: "google" },
  { id: 2, name: "Friend/Colleague", value: "friend-colleague" },
  { id: 3, name: "Social Media", value: "social-media" },
  { id: 4, name: "Client Referral", value: "client-referral" },
  { id: 5, name: "Online Advertisement", value: "online-advertisement" },
  { id: 6, name: "Other", value: "other" },
];

const SendContactForm = ({
  onOpen,
  onOpenChange,
}: {
  onOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email_address: "",
      phone_number: "",
      company_name: "",
      customer_address: "",
      site_location: "",
      type_of_service: "",
      project_description: "",
      building_plans: "",
      upload_building_plans: null as unknown as FileList,
      requested_time_and_date: "",
      start_date: "",
      budget_range: "",
      how_do_you_know_about_us: "",
    },
  });

  // navbar get api integration
  const { data } = useQuery<NavbarResponse>({
    queryKey: ["navbar"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`).then((res) =>
        res.json()
      ),
  });

  // send contact form post api integratio
  const { mutate, isPending } = useMutation({
    mutationKey: ["send-contact-form"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-requests`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();

      toast.success(data.message || "Submitted successfully!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email_address", values.email_address);
    formData.append("phone_number", values.phone_number);
    formData.append("company_name", values.company_name);
    formData.append("customer_address", values.customer_address);
    formData.append("site_location", values.site_location);
    formData.append("type_of_service", values.type_of_service);
    formData.append("project_description", values.project_description);
    formData.append("building_plans", values.building_plans);
    formData.append("requested_time_and_date", values.requested_time_and_date);
    formData.append("start_date", values.start_date);
    formData.append("budget_range", values.budget_range);
    formData.append(
      "how_do_you_know_about_us",
      values.how_do_you_know_about_us
    );

    if (values.upload_building_plans) {
      formData.append("upload_building_plans", values.upload_building_plans[0]);
    }

    mutate(formData);

    console.log(values);
  };

  return (
    <Dialog open={onOpen} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1 md:gap-10 xl:gap-16 text-xl font-bold text-center leading-normal">
            <Image
              src={data?.data?.logo ?? "/assets/logo.png"}
              alt="nav logo"
              width={235}
              height={90}
              className="w-[200px] h-[75px]"
            />
            Request a Quote
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] md:h-[420px] lg:h-[520px] w-full md:max-w-[900px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-5 pb-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/** Name */}
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Email */}
                <FormField
                  name="email_address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Phone */}
                <FormField
                  name="phone_number"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Phone Number"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Company Name */}
                <FormField
                  name="company_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Company Name <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company Name"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Customer Address */}
                <FormField
                  name="customer_address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Customer Address <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Customer Address"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Site Location */}
                <FormField
                  name="site_location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Site Location <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Site Location"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/** Type of Service */}
              <FormField
                name="type_of_service"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type of Service Needed{" "}
                      <sup className="text-red-600">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeOfServiceOptions.map((service) => (
                            <SelectItem key={service.id} value={service.value}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Description of Project */}
              <FormField
                name="project_description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description of Project{" "}
                      <sup className="text-red-600">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project..."
                        {...field}
                        className="h-[100px] placeholder:text-secondary-100 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Building Plan - Radio Yes/No */}
              <FormField
                name="building_plans"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you have building plans?{" "}
                      <sup className="text-red-600">*</sup>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        <RadioGroupItem value="Yes" />
                        <label className="-mt-1" htmlFor="yes">
                          Yes
                        </label>
                        <RadioGroupItem value="No" />
                        <label className="-mt-1" htmlFor="no">
                          No
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Upload PDF */}
              <FormField
                name="upload_building_plans"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Building Plan (PDF){" "}
                      <sup className="text-red-600">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="requested_time_and_date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Requested Date <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="start_date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Estimated Start Date{" "}
                        <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/** Budget and About Us */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="budget_range"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Budget Range <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Budge Range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRangeOptions.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={service.value}
                              >
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="how_do_you_know_about_us"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How did you hear about us?{" "}
                        <sup className="text-red-600">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select how did you hear about us" />
                          </SelectTrigger>
                          <SelectContent>
                            {howDoYouHearAboutUs.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={service.value}
                              >
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button disabled={isPending} type="submit">
                  {isPending ? "Sending..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SendContactForm;
