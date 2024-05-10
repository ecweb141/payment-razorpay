"use client";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { LoginSchma, RegisterSchema } from "@/data/db/schema/RegisterSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const [confirmTerm, setConfirmTerm] = useState<boolean>(false);
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchma>>({
    defaultValues: {
      UserName: "",
      password: "",
    },
    resolver: zodResolver(LoginSchma),
  });

  const handleSubmit = async (data: any) => {
    const signInData = {
      userName: data.UserName,
      password: data.password,
    };
    try {
      const response = await signIn("credentials", {
        ...signInData,
        redirect: false,
      });
      if (response?.error) {
        setShowError(response.error);
        setShowSuccess("");
        return null;
      } else {
        setShowSuccess("Login successful!");
        setShowError("");
        setTimeout(() => {
          router.push("/"); // Redirect to home page after 5 seconds
        }, 5000);
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      setShowError("An error occurred. Please try again.");
      setShowSuccess("");
    }
  };

  return (
    <div className="p-4 flex flex-row ">
      <CardData
        title="Login Form"
        description="Login there And Get Your Features Back"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name={"UserName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="letter tracking-wide">Email</FormLabel>
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
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="letter">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className=" bg-amber-300  w-full rounded-lg flex items-center justify-center">
              <Button
                title="Login"
                type="submit"
                variant={"outline"}
                className=" text-black outline-none border-none hover:bg-amber-500"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
        {showError && (
          <div className="mt-4 w-96 bg-red-100 p-2 text-red-500">
            {showError}
          </div>
        )}
        {showSuccess && (
          <div className="mt-4 w-96 p-2 bg-green-100 text-green-500">
            {showSuccess}
          </div>
        )}

        <SocialAuth />
      </CardData>
    </div>
  );
};

export default LoginForm;
