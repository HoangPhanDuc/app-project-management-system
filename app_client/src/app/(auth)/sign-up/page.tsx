"use client";

import { signUpApi } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["member", "admin", "manager"]),
});

type SignUpFormInputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const [passwordEvent, setPasswordEvent] = useState<boolean>(false);
  const router = useRouter();

  const handlepasswordEvent = () => {
    setPasswordEvent((prev) => !prev);
  };

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const res = await signUpApi(
        data.name,
        data.email,
        data.password,
        data.role
      );
      console.log(res);
      if (res.status === true) {
        router.replace(`/verify-code?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordEvent ? "text" : "password"}
              placeholder="••••••"
              {...register("password")}
              className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {passwordEvent ? (
              <Eye
                className="absolute top-1/4 right-0 mr-2"
                onClick={handlepasswordEvent}
              />
            ) : (
              <EyeOff
                className="absolute top-1/4 right-0 mr-2"
                onClick={handlepasswordEvent}
              />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <select
            {...register("role")}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
