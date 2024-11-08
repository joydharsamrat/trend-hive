/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerUser } from "@/actions/registerUser";
import THForm from "@/components/form/THForm";
import THInput from "@/components/form/THInput";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");
    try {
      const res = await registerUser(data);

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      toast.success("Sign up successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(error?.data?.message || "Sign up failed. Please try again.", {
        id: loadingToast,
      });
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn my-20">
        <div>
          <h2 className="text-3xl font-bold text-center text-primary-700">
            Register
          </h2>
          <p className="text-center text-xs mt-2">Welcome to TrendHive</p>
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
            Register
          </button>
        </THForm>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
