/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/shared/Loader";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagement/orderManagement";
import React, { useEffect } from "react";

const PaymentManagement = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const orders = data.data;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Payments</h2>
        <div className="mt-8 space-y-6 overflow-x-auto">
          {orders.length === 0 ? (
            <div className="text-center text-lg text-gray-700 animate__animated animate__fadeIn">
              No Data found.
            </div>
          ) : (
            <table className="table table-zebra w-full overflow-x-auto">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order._id}>
                    <td className="min-w-60">{order._id}</td>
                    <td className="min-w-40">{order.billingInfo.name}</td>
                    <td className="min-w-32">${order.price}</td>
                    <td className="min-w-32 text-green-500">Paid</td>
                    <td className="min-w-32">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
