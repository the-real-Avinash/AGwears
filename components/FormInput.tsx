"use client";
import { FieldError } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function FormInput({ label, error, ...rest }: Props) {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        {...rest}
        className={`w-full px-4 py-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-200`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
