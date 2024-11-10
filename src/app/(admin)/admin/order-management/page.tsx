/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/shared/Loader";
import OrderDetailsModal from "@/components/shared/order/OrderDetailsModal";
import {
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/admin/orderManagement/orderManagement";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const OrderManagement = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const loadingToast = toast.loading("loading...");

    try {
      const res = await updateOrderStatus({ id, status });
      if (res.error) {
        throw res.error;
      }
      toast.success("Updating successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "failed to cancel order. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const orders = data.data;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <Link href="/admin/order-management/payment" className="btn-primary">
            Payments
          </Link>
        </div>
        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center text-lg text-gray-700 animate__animated animate__fadeIn">
              No orders found.
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
                        order.status === "delivered"
                          ? "text-green-600"
                          : order.status === "pending"
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
                    <ul className="list-disc space-y-2">
                      {order.items.map((item: any) => (
                        <li
                          key={item.product._id}
                          className="flex items-center space-x-4 text-gray-700 "
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
                  <div className="md:flex justify-between items-center">
                    <p className="text-xl font-semibold text-red-500">
                      ${order.price.toFixed(2)}
                    </p>
                    <div className="md:flex justify-end items-center gap-5">
                      {order.status === "pending" && (
                        <div className="md:space-x-2">
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "canceled")
                            }
                            className=" btn-secondary mt-4 sm:mt-0"
                          >
                            Cancel Order
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "delivered")
                            }
                            className=" btn-primary mt-4 sm:mt-0"
                          >
                            Order Delivered
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() =>
                          (
                            document.getElementById(order._id) as any
                          )?.showModal()
                        }
                        className=" btn-primary mt-4 sm:mt-0"
                      >
                        View Details
                      </button>
                    </div>
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

export default OrderManagement;
