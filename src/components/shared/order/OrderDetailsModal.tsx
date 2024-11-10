/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

const OrderDetailsModal = ({ order }: { order: any }) => {
  return (
    <dialog id={order._id} className="modal">
      <div className="modal-box max-w-lg bg-white">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => (document.getElementById(order._id) as any)?.close()}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">Order Details</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold">Billing Information:</h4>
            <p className="text-gray-700">{order.billingInfo.name}</p>
            <p className="text-gray-700">{order.billingInfo.address}</p>
            <p className="text-gray-700">
              {order.billingInfo.city}, {order.billingInfo.state}
            </p>
            <p className="text-gray-700">{order.billingInfo.phone}</p>
            <p className="text-gray-700">{order.billingInfo.email}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Items:</h4>
            <ul className="list-disc  space-y-2">
              {order.items.map((item: any) => (
                <li
                  key={item.product._id}
                  className="flex items-center space-x-4"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-gray-700">{item.product.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <p className="text-xl font-semibold text-red-500">
              Total: ${order.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default OrderDetailsModal;
