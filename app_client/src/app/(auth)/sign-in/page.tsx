"use client";

import { loginAction } from "@/lib/actions/auth";
import { LoginFormInputs, loginSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const initialState = { error: "" };

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [passwordEvent, setPasswordEvent] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      switch (state.role) {
        case "admin":
          router.replace("/admin");
          break;
        case "manager":
          router.replace("/manager");
          break;
        case "member":
          router.replace("/member");
          break;
        default:
          router.replace("/");
      }
    }
  }, [state]);

  const onSubmit = async (data: LoginFormInputs) => {
    setHasSubmitted(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h1>

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
                className="absolute top-1/4 right-0 mr-2"
                onClick={() => setPasswordEvent(false)}
              />
            ) : (
              <EyeOff
                className="absolute top-1/4 right-0 mr-2"
                onClick={() => setPasswordEvent(true)}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {hasSubmitted && state?.error && (
          <p className="text-red-600 text-xs mb-3 text-center">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
