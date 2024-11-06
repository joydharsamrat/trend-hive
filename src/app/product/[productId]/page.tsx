import ProductDetailsBanner from "@/components/product/ProductDetailsBanner";
import { TProduct } from "@/types";
import Image from "next/image";

// static params
export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:5000/api/v1/products");
  const products = await res.json();

  return products?.data.slice(0, 5).map((product: TProduct) => ({
    productId: product._id,
  }));
};

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const res = await fetch(
    `http://localhost:5000/api/v1/products/${productId}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  const product = data.data;

  return (
    <div className="min-h-screen">
      {/* Product Banner */}
      <ProductDetailsBanner name={product.name} />

      {/* Product Details Container */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg  p-8 my-8 flex flex-col lg:flex-row items-center lg:items-center animate__animated animate__zoomIn">
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
            <p className="text-lg text-gray-600">
              Available Quantity: {product.quantity}
            </p>
          </div>

          {/* Animated Button */}
          <div className="mt-8 text-center animate__animated animate__fadeInUp animate__delay-2s">
            <button className="bg-primary-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-500 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
