"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/shared/Loader";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categories/category.api";
import { TCategory } from "@/types";
import CategoryModal from "@/components/admin/CategoryModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CategoryManagementPage = () => {
  const { data: categoryData, isLoading } = useGetAllCategoriesQuery(undefined);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<TCategory | null>(
    null
  );

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data);
    }
  }, [categoryData]);

  const handleOpenModal = (category?: TCategory) => {
    if (category) {
      setCurrentCategory(category);
      setIsEditing(true);
    } else {
      setCurrentCategory({ _id: "", title: "" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const handleSaveCategory = async (title: string) => {
    if (isEditing && currentCategory) {
      await updateCategory({ id: currentCategory._id, data: { title } });
    } else {
      await createCategory({ title });
    }
    handleCloseModal();
  };

  const handleDeleteCategory = async (id: string) => {
    await updateCategory({ id, data: { isDeleted: true } });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Category Management</h1>

      <button onClick={() => handleOpenModal()} className=" btn-primary mb-4">
        Add Category
      </button>

      <div className="bg-base-200 p-4 rounded shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">Category</th>
              <th className="p-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-2">{category.title}</td>
                <td className="p-2 text-center space-x-5">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="text-blue-600 hover:underline"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-secondary-900"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CategoryModal
          isEditing={isEditing}
          currentCategory={currentCategory}
          onSave={handleSaveCategory}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CategoryManagementPage;
