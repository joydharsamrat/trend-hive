/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/actions/registerUser";
import THForm from "@/components/form/THForm";
import THInput from "@/components/form/THInput";
import { useUser } from "@/context/userProvider";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const { setIsLoading } = useUser();

  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams.get("redirect");

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("loading...");
    try {
      await loginUser(data);
      setIsLoading(true);
      toast.success("Login successful!", { id: loadingToast });
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        id: loadingToast,
      });
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
        <div>
          <h2 className="text-3xl font-bold text-center text-primary-700">
            Login
          </h2>
          <p className="text-center text-xs mt-2">Welcome to TrendHive</p>
        </div>
        <THForm onsubmit={onSubmit} resolver={zodResolver(loginSchema)}>
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
            Login
          </button>
        </THForm>
        <p className="text-center text-sm text-gray-500">
          New to TrendHive?{" "}
          <Link href="/register" className="text-primary-900 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
