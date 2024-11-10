/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import THForm from "@/components/form/THForm";
import THInput from "@/components/form/THInput";
import { useCreateUserMutation } from "@/redux/features/admin/userManagement/userManagement.api";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");
    try {
      const res = await createUser(data);
      if (res.error) {
        throw res.error;
      }
      toast.success("User created successfully!", { id: loadingToast });
      router.push("/admin/user-management");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "failed to create user. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-background-200 rounded-lg shadow-lg animate__animated animate__fadeIn my-20">
        <div>
          <h2 className="text-3xl font-bold text-center text-primary-700">
            Create User
          </h2>
        </div>
        <THForm onsubmit={onSubmit} resolver={zodResolver(registerSchema)}>
          <THInput label="Name" name="name" required={true} type="text" />
          <THInput label="Email" name="email" required={true} type="email" />
          <THInput
            label="Password"
            name="password"
            required={true}
            type="password"
          />

          <button
            type="submit"
            className="w-full py-3 text-white bg-primary-900 rounded-lg hover:bg-primary-700"
          >
            Create
          </button>
        </THForm>
      </div>
    </div>
  );
}
