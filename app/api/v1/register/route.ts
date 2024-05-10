// import prismadb from "@/data/db/prismadb";
// import { NextResponse } from "next/server";
// import bcrypt, { hash } from "bcryptjs";
// import { SendMail, SendMailOption } from "@/data/email/sendmail";
// import Jwt from "jsonwebtoken";

// export const POST = async (rq: Request) => {
//   try {
//     const body = await rq.json();

//     const { firstName, lastName, Email, password } = await body.datas;
//     console.log(Email, password, firstName, lastName, "this are data");
//     if (!firstName || !lastName || !Email || !password) {
//       return new NextResponse("please Provide Enoght Data to create account", {
//         status: 400,
//       });
//     }

//     console.log(body, "every data is here");
//     const oldUser = await prismadb.user.findUnique({
//       where: { email: Email },
//     });

//     if (oldUser) {
//       return NextResponse.json(
//         "You Have Already Account please Login With that",
//         {
//           status: 401,
//         }
//       );
//     }
//     console.log("You dont have any old account", "every data is here");
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword, "hashedpassword");
//     const newUser = await prismadb.user.create({
//       data: {
//         email: Email,
//         hashedPassword: hashedPassword,
//         lastName: lastName,
//         firstName: firstName,
//       },
//     });
//     console.log("User has been created", newUser.id);
//     const EncryptId = Jwt.sign(newUser.id, process.env.jwt_secret as string);
//     const ActivationLink = `http://localhost:3000/auth/verify/${EncryptId}`;
//     const MailData: SendMailOption = {
//       to: newUser.email,
//       from: "ecweb141@gmail.com",
//       lastName: newUser.firstName as string,
//       link: ActivationLink,
//     };
//     const mail = SendMail(MailData);
//     console.log("Hello there", mail);
//     return NextResponse.json(`This is your id ${newUser.id}`, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(`This an error from the server, ${error} `, {
//       status: 500,
//     });
//   }
// };
