"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterAction } from "../../../../action/register";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      setError("");

      const result = await RegisterAction(data);

      if ("error" in result) {
        setError(result.error);
        return;
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response?.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 font-mono text-terminal-green">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">
            ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
          </h1>
          <p className="text-xl">NEW USER REGISTRATION PROTOCOL</p>
          <div className="my-4">
            <span className="animate-terminal-blink">█</span>
          </div>
        </div>

        {error && (
          <div className="border-2 border-red-500 p-4 mb-6 bg-red-500/10">
            <p className="text-red-500">ERROR: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2">{">"}_ USERNAME</label>
            <input
              {...register("username")}
              className="terminal-input"
              type="text"
            />
            {errors.username && (
              <p className="terminal-error">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">{">"}_ EMAIL</label>
            <input
              {...register("email")}
              className="terminal-input"
              type="email"
            />
            {errors.email && (
              <p className="terminal-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">{">"}_ PASSWORD</label>
            <input
              {...register("password")}
              className="terminal-input"
              type="password"
            />
            {errors.password && (
              <p className="terminal-error">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">{">"}_ CONFIRM PASSWORD</label>
            <input
              {...register("confirmPassword")}
              className="terminal-input"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="terminal-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-terminal-dark border-2 border-terminal-green px-6 py-2 hover:bg-terminal-green hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "INITIALIZING..." : "INITIALIZE"}
            </button>
            <a
              href="/login"
              className="text-terminal-green hover:text-terminal-light"
            >
              {">"}_ RETURN TO LOGIN
            </a>
          </div>
        </form>

        {isLoading && (
          <div className="mt-4">
            <p className="animate-pulse">PROCESSING REQUEST...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
