"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [attempts, setAttempts] = useState(4);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAttempts((prev) => prev - 1);
    } else {
      router.push("/dashboard"); // Redirect to dashboard on success
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 font-mono text-terminal-green">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">
            ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
          </h1>
          <p className="text-xl">COPYRIGHT 2075-2077 ROBCO INDUSTRIES</p>
          <div className="my-4">
            <span className="animate-terminal-blink">█</span>
          </div>
        </div>

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

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-terminal-dark border-2 border-terminal-green px-6 py-2 hover:bg-terminal-green hover:text-background transition-colors"
            >
              ENTER
            </button>
            <div className="text-xl">{attempts} ATTEMPT(S) LEFT</div>
            <Link href="/register">
              <div className="text-terminal-green hover:text-terminal-light">
                {">"}_ NEW USER
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
