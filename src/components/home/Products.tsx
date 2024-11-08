"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/category.api";
import { TCategory, TProduct } from "@/types";
import Spinner from "../loaders/Spinner";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 12;

  const query = {
    searchTerm: debouncedSearchTerm,
    category: selectedCategory,
    sort,
    page,
    limit,
  };

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sort, searchTerm]);

  if (isCategoryLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-6 gap-4 bg-gradient py-5 rounded-3xl">
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
          className="select  w-full lg:w-auto bg-white "
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
          className="select  w-full lg:w-auto bg-white"
        >
          <option disabled>Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products?.data?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className=" btn btn-sm bg-primary-900 text-white hover:bg-primary-700 disabled:bg-neutral-500 disabled:text-white border-none"
        >
          «
        </button>

        <button disabled className=" btn btn-sm">
          {page}
        </button>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={products?.data?.length < limit}
          className=" btn btn-sm bg-primary-900 text-white hover:bg-primary-700 disabled:bg-neutral-500 disabled:text-white border-none"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Products;
