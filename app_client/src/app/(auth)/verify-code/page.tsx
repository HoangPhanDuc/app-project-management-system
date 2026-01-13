"use client";

import { verifyCodeApi } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

const verifyCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits"),
});

type VerifyCodeFormInputs = z.infer<typeof verifyCodeSchema>;

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<VerifyCodeFormInputs>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      inputsRef.current[index] = el;
    },
    []
  );

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  if (!email) {
    router.replace("/sign-up");
    return null;
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setValue("code", newOtp.join(""));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length !== 6) return;

    const newOtp = paste.split("");
    setOtp(newOtp);
    setValue("code", paste);
    inputsRef.current[5]?.focus();
  };

  const onSubmit = async (data: VerifyCodeFormInputs) => {
    const res = await verifyCodeApi(email, data.code);
    if (res.status === true) {
      toast.success("Email verified successfully!");
      router.replace("/sign-in");
    } else {
      toast.error(res.message || "Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" max-w-sm w-full space-y-6 p-6 bg-white rounded shadow"
      >
        <h1 className="text-xl font-semibold text-center">Verify your email</h1>

        <p className="text-sm text-gray-500 text-center">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => setInputRef(el, index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="relative w-full h-0">
          {errors.code && (
            <p className="absolute text-red-500 text-xs text-center w-full -top-5">
              {errors.code.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
