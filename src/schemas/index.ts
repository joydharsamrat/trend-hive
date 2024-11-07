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
