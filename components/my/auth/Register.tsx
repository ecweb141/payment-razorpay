"use client";
import LoginImage from "@/assets/Images/Register.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import CardData from "./Card";
import { RegisterSchema } from "@/data/db/schema/RegisterSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [confirmTerm, setConfirmTerm] = useState<boolean>(false);
  const [showError, setSHowError] = useState("");
  const [showSuccess, setSHowSuccess] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      Email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (datas: any) => {
    console.log("Submitted data:", datas);
    setSHowError("");
    setSHowSuccess("");

    const cb = await axios.post("/api/v1/register", { datas });
    if (cb.status == 401) {
      return setSHowError("user  is already exist with this email");
    }
    if (cb.status == 400) {
      return setSHowError("Please Enter All the fields");
    }
    setSHowSuccess(
      "You have Successfully created your account we are redirecting to home page "
    );
    if (cb.status == 201) {
      const signInData = {
        userName: datas.UserName,
        password: datas.password,
      };
      await signIn("credentials", { ...signInData, redirect: false });
    }
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  return (
    <div className="flex gap-3 bg-slate-100 flex-col md:flex-row items-center justify-center md:justify-between p-4">
      <CardData
        title="Register Form"
        description="Register with us and get all features"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="First Name" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Last Name" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="your password here"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="">
              {showError && (
                <p className=" bg-rose-200 text-white p-2">{showError}</p>
              )}
              {showSuccess && (
                <p className=" bg-green-300  text-white p-2">{showSuccess}</p>
              )}
            </div>
            <Button
              title="Register"
              type="submit"
              variant="outline"
              className="bg-amber-300 rounded-md text-black outline-none border-none hover:bg-amber-500 mt-4 md:mt-0"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardData>
      <div className="hidden md:block">
        <Image
          className="w-80 h-80 rounded-md shadow-sm"
          alt="Registration Image"
          src={LoginImage}
          width={320}
          height={320}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
