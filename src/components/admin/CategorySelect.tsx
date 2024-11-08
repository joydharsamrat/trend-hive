import { useFormContext } from "react-hook-form";

const CategorySelect = ({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: { _id: string; title: string }[];
  required: boolean;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name, { required })}
        id={name}
        className={`w-full p-2 mt-1 border rounded shadow-inner shadow-primary-700 ${
          errors[name] && "border-red-500 shadow-secondary-700"
        }`}
      >
        <option value="">Select a category</option>
        {options?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CategorySelect;
