/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import THForm from "@/components/form/THForm";
import THInput from "@/components/form/THInput";
import Link from "next/link";
import { FieldValues } from "react-hook-form";

export default function Login() {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
        <THForm onsubmit={onSubmit}>
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
