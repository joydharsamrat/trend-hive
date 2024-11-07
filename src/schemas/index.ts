import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Provide a valid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  email: z.string().email("Provide a valid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export const checkOutSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  email: z.string().email("Provide a valid email").trim(),
  phone: z.string().min(10, "Phone number is required"),
});
