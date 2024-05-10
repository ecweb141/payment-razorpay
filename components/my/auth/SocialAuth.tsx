"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProviderTypes = "github" | "google";
const SocialAuth = () => {
  const router = useRouter();
  const handleLogin = async (provider: ProviderTypes) => {
    await signIn(provider, { redirect: false }).then((cb) => {
      if (cb?.ok) {
        setTimeout(() => {
          router.push("/");
        }, 5000);
        return <div className="">You have been succesfuly login</div>;
      }
      if (!cb?.ok || cb.error) {
        return null;
      }
    });
  };
  return (
    <div className=" my-4">
      <div className=" flex gap-3 flex-row">
        <Button
          variant={"default"}
          onClick={() => handleLogin("google")}
          className="bg-slate-200 p-2 w-full items-center justify-center hover:bg-blue-200"
        >
          <FcGoogle size={25} />
        </Button>
        <Button
          variant={"default"}
          onClick={() => handleLogin("github")}
          className=" bg-slate-200 p-2 w-full items-center justify-center hover:opacity-95"
        >
          <AiFillGithub size={25} />
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
