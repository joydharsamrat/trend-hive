/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/shared/Loader";
import OrderDetailsModal from "@/components/shared/order/OrderDetailsModal";
import { useUser } from "@/context/userProvider";
import { useGetOrdersForUserQuery } from "@/redux/features/order/order.api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Orders = () => {
  const { data, isLoading: isOrdersLoading } =
    useGetOrdersForUserQuery(undefined);
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isOrdersLoading) {
    return <Loader />;
  }

  const orders = data.data;

  return (
    <div className="min-h-screen bg-gradient py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center text-white animate__animated animate__fadeIn">
          Your Orders
        </h1>
        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center text-lg text-gray-700 animate__animated animate__fadeIn">
              No orders found. Please place an order first.
            </div>
          ) : (
            orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate__animated animate__fadeIn"
              >
                <div className="md:flex items-center justify-between mb-4">
                  <h2 className="text-sm md:text-xl font-bold text-gray-700">
                    Order ID: {order._id}
                  </h2>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-800">
                      Status:
                    </h3>
                    <p
                      className={`text-sm font-semibold uppercase ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <ul className="space-y-2">
                      {order.items.map((item: any) => (
                        <li
                          key={item.product._id}
                          className="flex items-center space-x-4 text-gray-700"
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={70}
                            height={70}
                            className="  object-cover rounded-md"
                          />
                          <div>
                            <span className="block text-sm">
                              {item.product.name}
                            </span>
                            <span className="text-sm font-semibold">
                              Quantity: {item.quantity}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-red-500">
                      ${order?.price?.toFixed(2)}
                    </p>
                    <button
                      onClick={() =>
                        (
                          document.getElementById(order?._id) as any
                        )?.showModal()
                      }
                      className=" btn-primary mt-4"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <OrderDetailsModal order={order} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
