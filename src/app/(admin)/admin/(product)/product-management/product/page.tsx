/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddProductModal from "@/components/admin/AddProductModal";
import EditProductModal from "@/components/admin/EditProductModal";
import Loader from "@/components/shared/Loader";
import { useDeleteProductMutation } from "@/redux/features/admin/productManagement/productManagement.api";
import { useGetAllProductsQuery } from "@/redux/features/products/products.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { data, isLoading } = useGetAllProductsQuery({
    category: "",
    limit: 0,
    page: 0,
    searchTerm: "",
    sort: "asc",
  });

  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    setIsOpen(true);
    setIsEditOpen(true);
  }, [isOpen, isEditOpen]);

  const handleDeleteProduct = async (id: string) => {
    const loadingToast = toast.loading("loading...");

    try {
      const res = await deleteProduct(id);
      if (res.error) {
        throw res.error;
      }
      toast.success("Delete successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Delete user failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.error(error);
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
    (document?.getElementById("edit_product_modal") as any)?.showModal();
  };

  if (isLoading) {
    return <Loader />;
  }

  const products = data?.data;

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setIsOpen(true);
            (document?.getElementById("my_modal_3") as any)?.showModal();
          }}
          className=" btn-primary"
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any) => (
              <tr key={product._id}>
                <td>
                  <Image
                    width={60}
                    height={60}
                    src={product.image}
                    alt={product.name}
                    className="object-cover"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category.title}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td className="space-x-2 min-w-20">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-primary-900 text-xl"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-secondary-900 text-xl"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isOpen && <AddProductModal setIsOpen={setIsOpen} />}

      {/* Edit Product Modal */}
      {isEditOpen && (
        <EditProductModal product={selectedProduct} setIsOpen={setIsEditOpen} />
      )}
    </div>
  );
};

export default ProductManagement;
