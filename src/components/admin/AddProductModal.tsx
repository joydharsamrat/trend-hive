/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DescriptionInput from "./DescriptionInput";
import CategorySelect from "./CategorySelect";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/category.api";
import THForm from "../form/THForm";
import THInput from "../form/THInput";
import { FieldValues } from "react-hook-form";
import Loader from "../shared/Loader";
import { useCreateProductMutation } from "@/redux/features/admin/productManagement/productManagement.api";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas";

const AddProductModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined);
  const [createProduct] = useCreateProductMutation();

  const handleAddProduct = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");

    const productData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };

    try {
      const res = await createProduct(productData);
      if (res.error) {
        throw res.error;
      }
      setIsOpen(false);
      toast.success("create successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(error?.data?.message || "create failed. Please try again.", {
        id: loadingToast,
      });
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <div className="bg-white p-10 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-10">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

          <THForm
            onsubmit={handleAddProduct}
            resolver={zodResolver(productSchema)}
          >
            <THInput label="Product Name" type="text" name="name" required />
            <THInput label="Price" type="number" name="price" required />
            <THInput label="Quantity" type="number" name="quantity" required />

            <DescriptionInput label="Description" name="description" required />

            <THInput label="Image URL" type="text" name="image" required />

            <CategorySelect
              label="Category"
              name="category"
              options={data?.data}
              required
            />
            <input id="submitProduct" type="submit" className="hidden" />
          </THForm>
          <div className="flex justify-end mt-2">
            <label htmlFor="submitProduct" className="btn btn-primary">
              Add Product
            </label>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddProductModal;
