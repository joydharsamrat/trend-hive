"use client";

import { useUser } from "@/context/userProvider";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { TProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Loader from "../shared/Loader";
import { useRouter } from "next/navigation";

const ProductDetailsCard = ({ product }: { product: TProduct }) => {
  const [quantity, setQuantity] = useState(1); // State to hold quantity
  const [addToCart] = useAddToCartMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login");
    }
    setIsLoading(true);
    try {
      const item = {
        user: user?._id,
        product: product._id,
        quantity,
      };

      const res = await addToCart(item);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg p-8 my-8 flex flex-col lg:flex-row items-center lg:items-center animate__animated animate__zoomIn">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-8">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover rounded-md shadow-md animate__animated animate__fadeInLeft"
        />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">
          {product.name}
        </h1>

        <p className="text-gray-700 text-lg mb-4 animate__animated animate__fadeIn animate__delay-1s">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-semibold text-secondary-700">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-2xl font-semibold ">stock: {product.quantity}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center mt-4">
          <button
            onClick={handleQuantityDecrease}
            className="bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-l hover:bg-gray-400 transition duration-200"
          >
            -
          </button>
          <span className="mx-3 text-lg">{quantity}</span>
          <button
            onClick={handleQuantityIncrease}
            className="bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-r hover:bg-gray-400 transition duration-200"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-8 text-center animate__animated animate__fadeInUp">
          <button
            onClick={handleAddToCart}
            className="bg-primary-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-500 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
