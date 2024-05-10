import * as z from "zod";

export const RegisterSchema = z.object({
  Email: z.string().email({ message: "Email is Required Field" }),
  firstName: z.string().min(3, { message: "FirstName is Required" }),
  lastName: z.string().min(3, { message: "LastName is Required" }),
  password: z
    .string()
    .min(6, { message: "password must  be required an greter than 6 char" }),
  confirm: z.boolean().default(false).optional(),
});

export const LoginSchma = z.object({
  UserName: z.string().email({
    message:
      "Please fill this email filed alos it's the neccesory part of login",
  }),
  password: z
    .string()
    .min(7, { message: "Password Must Be required and greter than 7 char" }),
});
