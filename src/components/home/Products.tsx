"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/category.api";
import { TCategory, TProduct } from "@/types";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isFetching, setIsFetching] = useState(false); // Manual fetching state

  const limit = 12;

  const query = {
    searchTerm: debouncedSearchTerm,
    category: selectedCategory,
    sort,
    page,
    limit,
  };

  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: products, isLoading } = useGetAllProductsQuery(query);

  // Debounce logic for searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Reset products when filters change
  useEffect(() => {
    setIsFetching(true); // Start manual fetching state
    setPage(1);
    setAllProducts([]);
    setTotalProducts(0);
  }, [selectedCategory, sort, debouncedSearchTerm]);

  // Update products when new data is fetched
  useEffect(() => {
    if (products?.data?.products?.length) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...products.data.products,
      ]);
    }

    if (products?.data?.totalProducts) {
      setTotalProducts(products?.data?.totalProducts);
    }

    setIsFetching(false); // End manual fetching state
  }, [products]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMore = allProducts.length < totalProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-6 gap-4 bg-gradient py-5 px-5 rounded md:rounded-3xl md:px-0">
        <div className="form-control w-full lg:w-1/2">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full border-white bg-white"
            />
          </div>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="select w-full lg:w-auto bg-white"
        >
          <option value="">All Categories</option>
          {categories?.data?.map((category: TCategory) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as "desc" | "asc");
          }}
          className="select w-full lg:w-auto bg-white"
        >
          <option disabled>Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Show loading state for filters */}
      {(isLoading || isFetching) && allProducts.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="btn bg-primary-900 text-white hover:bg-primary-700 border-none"
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
