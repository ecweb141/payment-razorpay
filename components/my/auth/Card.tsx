"use client";
import {
  FontJosefin_Sans,
  FontOpen_Sans,
  fontPoppins,
} from "@/components/fonts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { FC, ReactNode } from "react";
interface CardData {
  title: string;
  description: string;
  children: ReactNode;
}
const CardForAUth: FC<CardData> = ({ title, description, children }) => {
  return (
    <>
      <Card className=" shadow-md flex-col  border-none rounded-lg bg-[rgba(63,122,117,0.1)] flex justify-center p-4  ">
        <CardHeader>
          <CardTitle
            className={`self-center text-3xl capitalize ,${FontOpen_Sans.className}`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`capitalize self-center placeholder-opacity-75 text-black font-semibold , `}
          >
            <p className={`${FontOpen_Sans.className}`}>{description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardForAUth;
