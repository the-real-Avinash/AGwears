"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });
  const { call, loading, error } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: SignupData) => {
    await call("register", data);
    // router.push("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Name" type="text" {...register("name")} error={errors.name} />
        <FormInput label="Email" type="email" {...register("email")} error={errors.email} />
        <FormInput label="Password" type="password" {...register("password")} error={errors.password} />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-600">Sign In</a>
      </p>
    </motion.div>
  );
}
