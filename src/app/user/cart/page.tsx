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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartItems = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [removeFromCart] = useDeleteCartItemMutation();
  const [updateCartQuantity] = useUpdateItemQuantityMutation();
  const { data: cartItems, isLoading: cartLoading } =
    useGetItemsByUserQuery(undefined);

  const [isDisabled, setIsDisabled] = useState(false);

  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (cartItems) {
      const shouldDisable = cartItems.data.data.some(
        (item: TCartItem) =>
          item.quantity > item.product.quantity || item.product.quantity === 0
      );
      setIsDisabled(shouldDisable);
    }
  }, [cartItems]);

  if (cartLoading || isUpdating || isRemoving) {
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
      const res = await removeFromCart({ id: itemId }).unwrap();
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      setIsUpdating(itemId);
      const res = await updateCartQuantity({ id: itemId, quantity }).unwrap();
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="bg-gradient min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Your Cart
        </h1>

        {cartItems?.data.data.length > 0 ? (
          <div className="p-6 sm:p-10 bg-white rounded">
            {cartItems.data.data.map((item: TCartItem) => (
              <div key={item.product._id} className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between border-b py-4 space-y-4 sm:space-y-0">
                  {/* Product Details */}
                  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />

                    <div className="text-center sm:text-left mt-2 sm:mt-0">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:hover:bg-gray-300"
                      disabled={
                        isUpdating === item._id ||
                        isRemoving === item._id ||
                        item.quantity <= 1
                      }
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:hover:bg-gray-300"
                      disabled={
                        isUpdating === item._id ||
                        isRemoving === item._id ||
                        item.quantity >= item.product.quantity
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal and Remove Button */}
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <p className="text-lg font-semibold text-primary-700">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={
                        isRemoving === item._id || isUpdating === item._id
                      }
                    >
                      {isRemoving === item._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
                {item.product.quantity === 0 && (
                  <p className="text-xs text-red-500">Out of stock!</p>
                )}
                {item.product.quantity < item.quantity &&
                  item.product.quantity !== 0 && (
                    <p className="text-xs text-red-500">
                      Not enough items available!
                    </p>
                  )}
              </div>
            ))}

            {/* Total Price and Checkout Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-700">
                Total: ${totalPrice.toFixed(2)}
              </h2>
              {isDisabled ? (
                <button
                  className="bg-primary-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md opacity-50 cursor-not-allowed"
                  disabled
                >
                  Proceed to Checkout
                </button>
              ) : (
                <Link
                  href="/user/checkout"
                  className="bg-primary-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md hover:bg-primary-500 transition duration-300"
                >
                  Proceed to Checkout
                </Link>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-white mt-20">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartItems;
