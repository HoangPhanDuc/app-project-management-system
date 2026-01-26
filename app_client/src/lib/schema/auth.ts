import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["member", "admin", "manager"]),
});

export type SignUpFormInputs = z.infer<typeof signupSchema>;

export const verifyCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits"),
});

export type VerifyCodeFormInputs = z.infer<typeof verifyCodeSchema>;
