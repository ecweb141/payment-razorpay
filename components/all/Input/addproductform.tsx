"use client";
import * as z from "zod";
const productSchema = z.object({
  name: z.string().min(4, { message: "Name Must be greater than 4 char or 4" }),
  description: z.string().min(150, {
    message: "The description must be greater than 50 words it's required",
  }),
  price: z.number().min(2, {
    message:
      "in the price more than 2 number or char are neccesory u need to followed if your product price is cheap then contect us",
  }),
  qty: z.number().min(2000, {
    message: "The quantity of product must be 2k or greater than it ",
  }),
  category: z.string(),
  types: z.string(),
  for: z.string().min(3, { message: "it can be min 3 char" }),
  parent: z
    .string()
    .min(5, { message: "your company name must be greater than 5 char" }),
});

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardForAUth from "@/components/my/auth/Card";
import Categoriesselect from "./Select/categorys_select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectImages from "./Select/SelectImages";
export const ProductAddForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const formData = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      qty: 0,
      category: "",
      for: "",
      types: "",
    },
    resolver: zodResolver(productSchema),
  });

  const FormSubmit = (data: any) => {
    console.log(data, "your data is here");
  };

  const categoriesGet = (data: any) => {
    console.log(data, "from main file");
  };

  return (
    <div className="  xl:px-72 xl:py-24 md:px-12 md:py-16 w-full h-full">
      <CardForAUth
        title="Add your product here"
        description="It will help you to add product"
      >
        <Form {...formData}>
          <form
            className="flex flex-col"
            onSubmit={formData.handleSubmit(FormSubmit)}
          >
            <FormField
              control={formData.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white text-[18px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Product name"
                      style={{ borderRadius: "4px" }}
                      className="border px-2 py-6 text-white rounded-md bg-[#2C4F38] border-none outline-none"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name={"description"}
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
            <FormField
              control={formData.control}
              name={"parent"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white text-[18px]">
                    Your Parrent Compony
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your Parent"
                      style={{ borderRadius: "4px" }}
                      className="border px-2 py-6 text-white rounded-md bg-[#284633] border-none outline-none"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className=" text-rose-500" />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name={"price"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white text-[18px]">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="00"
                      type="number"
                      style={{ borderRadius: "4px" }}
                      className="border px-2 py-6 text-white rounded-md bg-[#2C4F38] border-none outline-none"
                    />
                  </FormControl>
                  <FormDescription title="please add here" />
                  <FormMessage className=" text-rose-500" />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name={"qty"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white text-[18px]">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="00"
                      style={{ borderRadius: "4px" }}
                      type="number"
                      className="border px-2 py-6 text-white rounded-md bg-[#2C4F38] border-none outline-none"
                    />
                  </FormControl>
                  <FormDescription title="please add here" />
                  <FormMessage className=" text-rose-500" />
                </FormItem>
              )}
            />

            <Categoriesselect changeValue={categoriesGet} />

            <SelectImages maxFiles={12} setFiles={setImages} />

            <Button
              className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-700"
              type="submit"
            >
              Add Product
            </Button>
          </form>
        </Form>
      </CardForAUth>
    </div>
  );
};
