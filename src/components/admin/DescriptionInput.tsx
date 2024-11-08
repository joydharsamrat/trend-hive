import { useFormContext } from "react-hook-form";

const DescriptionInput = ({
  label,
  name,
  required,
}: {
  label: string;
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
      <textarea
        {...register(name, { required })}
        id={name}
        className={`w-full p-2 mt-1 border rounded shadow-inner shadow-primary-700 ${
          errors[name] && "border-red-500 shadow-secondary-700"
        }`}
        rows={3}
      ></textarea>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
export default DescriptionInput;
