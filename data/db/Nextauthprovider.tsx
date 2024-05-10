"use client";
import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthPRop {
  children: ReactNode;
}
const Nextauthprovider: FC<AuthPRop> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Nextauthprovider;
