"use client";

import { useFormContext } from "react-hook-form";

const THInput = ({
  label,
  type,
  name,
  required,
}: {
  label: string;
  type: string;
  name: string;
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
      <input
        {...register(name, { required: required })}
        type={type}
        id={name}
        className={`w-full p-3 mt-1 border rounded-lg ${
          errors[name] && "border-red-500 focus:ring-red-500"
        }`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default THInput;
