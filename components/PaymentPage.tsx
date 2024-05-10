"use client";

import React, { useState } from "react";
import Buy from "./Buy";
import axios from "axios";
import { useRouter } from "next/navigation";

const BuyProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async ({ productId = null }) => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/razorpay");
      const { order } = response.data;

      const options = {
        key: process.env.RAZORPAY_API_KEY,
        name: "mmantratech",
        currency: order.currency,
        amount: 20000,
        order_id: order.id,
        description: "Understanding RazorPay Integration",
        prefill: {
          name: "chetan gavit",
          email: "cgavit141@gmail.com",
          contact: "000000000",
        },
        handler: async function (response: any) {
          const verifyResponse = await axios.post(
            "http://localhost:3000/api/v1/paymentverify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyResponse.data?.message === "success") {
            router.push(
              "/paymentsuccess?paymentid=" + response.razorpay_payment_id
            );
          }
        },
      };

      const paymentObject = new Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      console.error("Error making payment:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <Buy makePayment={makePayment} />
      </div>
    </>
  );
};

export default BuyProduct;
