"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg-image.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-white"
        >
          Elevate Your Style
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-lg text-gray-100"
        >
          Discover our exclusive, sustainably‑made clothing line designed for comfort and confidence.
        </motion.p>
        <div className="flex space-x-4 justify-center">
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-blue-600"
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
