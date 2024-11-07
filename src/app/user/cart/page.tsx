"use client";

import Loader from "@/components/shared/Loader";
import { useUser } from "@/context/userProvider";
import {
  useDeleteCartItemMutation,
  useGetItemsByUserQuery,
  useUpdateItemQuantityMutation,
} from "@/redux/features/cart/cart.api";
import { TCartItem } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartItems = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [removeFromCart] = useDeleteCartItemMutation();
  const [updateCartQuantity] = useUpdateItemQuantityMutation();
  const { data: cartItems, isLoading: cartLoading } =
    useGetItemsByUserQuery(undefined);

  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user]);

  if (cartLoading || isRemoving || isUpdating) {
    return <Loader />;
  }

  // Calculate total price
  const totalPrice = cartItems?.data?.data.reduce(
    (total: string, item: TCartItem) =>
      total + item.product.price * item.quantity,
    0
  );

  const handleRemoveItem = async (itemId: string) => {
    try {
      setIsRemoving(itemId);
      await removeFromCart({ id: itemId }).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      setIsUpdating(itemId);
      await updateCartQuantity({ id: itemId, quantity }).unwrap();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-primary-700 mb-8">Your Cart</h1>

      {/* Cart Items */}
      {cartItems?.data.data.length > 0 ? (
        <div>
          {cartItems.data.data.map((item: TCartItem) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />

                {/* Product Details */}
                <div>
                  <h2 className="text-xl font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item._id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  disabled={isUpdating === item._id || isRemoving === item._id}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  disabled={isUpdating === item._id || isRemoving === item._id}
                >
                  +
                </button>
              </div>

              {/* Subtotal and Remove Button */}
              <div className="flex items-center space-x-6">
                <p className="text-lg font-semibold text-primary-700">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isRemoving === item._id || isUpdating === item._id}
                >
                  {isRemoving === item._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}

          {/* Total Price and Checkout Button */}
          <div className="flex justify-between items-center mt-8">
            <h2 className="text-2xl font-semibold text-primary-700">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button className="bg-primary-700 text-white font-semibold py-3 px-8 rounded-md hover:bg-primary-500 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-20">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartItems;