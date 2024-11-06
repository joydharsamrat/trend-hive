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
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { required: required })}
        type={type}
        id={name}
        className="w-full p-3 mt-1 border rounded-lg focus:ring-primary-900 focus:border-primary-900"
      />
    </div>
  );
};

export default THInput;
