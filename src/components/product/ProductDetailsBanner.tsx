import React from "react";

const ProductDetailsBanner = ({ name }: { name: string }) => {
  return (
    <div className="bg-gradient grid place-items-center h-60">
      <h2 className="text-3xl font-semibold text-white">{name}</h2>
    </div>
  );
};

export default ProductDetailsBanner;
