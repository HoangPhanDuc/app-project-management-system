"use client";

import { signUpAction } from "@/lib/actions/auth";
import { SignUpFormInputs, signupSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";

const initialState = { error: "" };

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );
  const [passwordEvent, setPasswordEvent] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handlepasswordEvent = () => {
    setPasswordEvent((prev) => !prev);
  };

  const onSubmit = async (data: SignUpFormInputs) => {
    setHasSubmitted(false);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formAction(formData);
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
            {...register("name", {
              onChange: () => setHasSubmitted(true),
            })}
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
            {...register("email", {
              onChange: () => setHasSubmitted(true),
            })}
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
              {...register("password", {
                onChange: () => setHasSubmitted(true),
              })}
              className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {passwordEvent ? (
              <Eye
                className="absolute top-1/4 right-0 mr-2 cursor-pointer"
                onClick={handlepasswordEvent}
              />
            ) : (
              <EyeOff
                className="absolute top-1/4 right-0 mr-2 cursor-pointer"
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
            {...register("role", {
              onChange: () => setHasSubmitted(true),
            })}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {hasSubmitted && state?.error && (
          <p className="text-red-600 text-xs mb-3 text-center">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
