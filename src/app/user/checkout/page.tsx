"use client";

import { useGetItemsByUserQuery } from "@/redux/features/cart/cart.api";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import THForm from "@/components/form/THForm";
import THInput from "@/components/form/THInput";
import { TCartItem } from "@/types";
import { checkOutSchema } from "@/schemas";
import Loader from "@/components/shared/Loader";
import { FieldValues } from "react-hook-form";
import { useUser } from "@/context/userProvider";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Checkout = () => {
  const { user, isLoading } = useUser();
  const { data: cartItems, isLoading: isItemsLoading } =
    useGetItemsByUserQuery(undefined);
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handlePayment = async (data: FieldValues) => {
    const loadingToast = toast.loading("Loading...");
    const orderData = {
      user: user?._id,
      billingInfo: data,
      price: totalPrice,
    };
    try {
      const res = await createOrder(orderData);
      if (res.error) {
        throw res.error;
      }

      if (res?.data?.data?.data?.result) {
        toast.dismiss(loadingToast);
        window.location.href = res?.data?.data?.data?.payment_url;
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = cartItems?.data?.data.reduce(
    (total: number, item: TCartItem) =>
      total + item.product.price * item.quantity,
    0
  );

  if (isItemsLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient  py-20">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Shipping & Billing Details
            </h2>

            <THForm
              onsubmit={handlePayment}
              resolver={zodResolver(checkOutSchema)}
            >
              <THInput label="Full Name" name="name" type="text" required />
              <THInput label="Address" name="address" type="text" required />
              <div className="md:flex gap-4">
                <div className="flex-1">
                  <THInput label="City" name="city" type="text" required />
                </div>
                <div className="flex-1">
                  <THInput label="State" name="state" type="text" required />
                </div>
              </div>
              <THInput label="Email" name="email" type="email" required />
              <THInput label="Phone Number" name="phone" type="tel" required />
              <input id="submitButton" type="submit" className="hidden" />
            </THForm>
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems?.data?.data.map((item: TCartItem) => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <p className="text-xl font-semibold text-primary-700">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <label htmlFor="submitButton" className="btn-primary">
                Proceed to Payment
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
