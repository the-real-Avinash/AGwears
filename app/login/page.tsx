"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { call, loading, error } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    await call("login", data);
    // router.push("/home"); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Email" type="email" {...register("email")} error={errors.email} />
        <FormInput label="Password" type="password" {...register("password")} error={errors.password} />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
      </p>
    </motion.div>
  );
}
