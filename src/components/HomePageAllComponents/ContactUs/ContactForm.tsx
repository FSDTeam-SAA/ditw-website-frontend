"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company name is required"),
  comments: z.string().min(1, "Comments are required"),
})

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      comments: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // handle form submission logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First row */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 w-full" placeholder="*First Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 w-full" placeholder="*Last Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Second row */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 w-full" type="tel" placeholder="*Phone Number" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 w-full" placeholder="*Company Name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Third row - Email (spans full width on mobile, half on desktop) */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Input className="h-10 w-full" type="email" placeholder="*Email Address" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Fourth row - Comments (spans full width) */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea placeholder="*Comments/Questions" className="min-h-24 w-full" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <Button type="submit" className="w-full sm:w-auto sm:min-w-[200px] bg-[#1d0fbf] hover:bg-[#2a1cc7]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
