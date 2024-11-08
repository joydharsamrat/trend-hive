import ProductDetailsBanner from "@/components/product/ProductDetailsBanner";
import ProductDetailsCard from "@/components/product/ProductDetailsCard";
import ProductReview from "@/components/product/Productreview";
import envConfig from "@/config/envConfig";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const res = await fetch(`${envConfig.baseApi}/products/${productId}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const product = data.data;

  return (
    <div className="min-h-screen">
      {/* Product Banner */}
      <ProductDetailsBanner name={product.name} />
      <ProductDetailsCard product={product} />
      <ProductReview productId={productId} />
    </div>
  );
};

export default ProductDetails;
