"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "please enter your name , name must be greter than 4 char",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be greater than eight char" }),
});

const HOMEPAGE = () => {
  const formData = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <div>
      <div className=" ">
        <Form {...formData}>
          <form>
            <FormField
              control={formData.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white text-[18px]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Please add your description here"
                      style={{ borderRadius: "4px" }}
                      className="border px-2 py-6 text-white rounded-md bg-[#2C4F38] border-none outline-none"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className=" text-rose-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
