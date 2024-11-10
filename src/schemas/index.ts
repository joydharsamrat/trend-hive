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

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be a positive number")
  ),
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().min(1, "Quantity is required")
  ),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL"),
  category: z.string().min(1, "Category is required"),
});
