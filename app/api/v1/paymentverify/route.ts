import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";

export const POST = async (req: Request) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id", body);
    const expectSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
      .update(body.toString())
      .digest("hex");
    const isAuthenticate = expectSignature === razorpay_signature;

    if (isAuthenticate) {
      return NextResponse.json("Your Order has been placed", { status: 201 });
    } else {
      return NextResponse.json(
        {
          message: "fail",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "you got succesfully order",
      },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(
      "We got an Internal Server Error It's happening because of us you don't need  to worry about it please be paitant and submit this error to developers or our team ",
      { status: 500 }
    );
  }
};
