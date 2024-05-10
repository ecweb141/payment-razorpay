"use server";
import prismadb from "../db/prismadb";

export const RegisterSample = async () => {
  const newUser = await prismadb.user.create({
    data: {
      email: "cgavit141@gmail.com",
      hashedPassword: "this is password",
      lastName: "chetan",
      firstName: "gavit",
      image: "this is an image",
    },
  });
  return newUser;
};
