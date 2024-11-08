const ProductCardSkeleton = () => {
  return (
    <div className="card card-compact h-full bg-white shadow-sm animate-pulse">
      <figure className="relative w-full aspect-square bg-gray-200"></figure>
      <div className="card-body">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="card-actions">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
