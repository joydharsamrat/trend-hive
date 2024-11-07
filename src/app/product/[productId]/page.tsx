import ProductDetailsBanner from "@/components/product/ProductDetailsBanner";
import ProductDetailsCard from "@/components/product/ProductDetailsCard";

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
      <ProductDetailsCard product={product} />
    </div>
  );
};

export default ProductDetails;
