import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_APT_SECRET as string,
});

export const GET = async (req: Request) => {
  try {
    const payment_capture = 1;
    const amount = 1 * 100; // amount in paisa. In our case it's INR 1
    const currency = "INR";
    console.log(currency, "currencey");
    const options = {
      amount: amount.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
      notes: {
        paymentFor: "testingDemo",
        userId: "100",
        productId: "P100",
      },
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({ msg: body });
}
