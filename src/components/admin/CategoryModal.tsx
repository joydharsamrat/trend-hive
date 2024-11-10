import { useState, useEffect } from "react";

interface CategoryModalProps {
  isEditing: boolean;
  currentCategory: { _id: string; title: string } | null;
  onSave: (title: string) => void;
  onClose: () => void;
}

const CategoryModal = ({
  isEditing,
  currentCategory,
  onSave,
  onClose,
}: CategoryModalProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (currentCategory) {
      setTitle(currentCategory.title);
    }
  }, [currentCategory]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>
        <input
          type="text"
          placeholder="Category Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className=" btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className=" btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
