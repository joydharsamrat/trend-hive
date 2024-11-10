/* eslint-disable @typescript-eslint/no-explicit-any */
import DescriptionInput from "./DescriptionInput";
import CategorySelect from "./CategorySelect";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/category.api";
import THForm from "../form/THForm";
import THInput from "../form/THInput";
import { FieldValues } from "react-hook-form";
import Loader from "../shared/Loader";
import { useUpdateProductMutation } from "@/redux/features/admin/productManagement/productManagement.api";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

const EditProductModal = ({
  product,
  setIsOpen,
}: {
  product: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    category: {
      title: string;
      _id: string;
    };
  };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();

  const handleUpdateProduct = async (data: FieldValues) => {
    const loadingToast = toast.loading("Updating product...");

    const updatedProductData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };

    try {
      const res = await updateProduct({
        id: product._id,
        data: updatedProductData,
      });
      if (res.error) {
        throw res.error;
      }
      setIsOpen(false);
      toast.success("Product updated successfully!", { id: loadingToast });
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed. Please try again.", {
        id: loadingToast,
      });
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <dialog id="edit_product_modal" className="modal">
      <div className="modal-box">
        <div className="bg-white p-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-10">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

          <THForm
            onsubmit={handleUpdateProduct}
            defaultValues={{
              name: product?.name,
              price: Number(product?.price),
              quantity: Number(product?.quantity),
              description: product?.description,
              image: product?.image,
              category: product?.category._id,
            }}
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
            <input id="submitEditProduct" type="submit" className="hidden" />
          </THForm>
          <div className="flex justify-end mt-2">
            <label htmlFor="submitEditProduct" className="btn btn-primary">
              Save Changes
            </label>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default EditProductModal;
