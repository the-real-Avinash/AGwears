"use client";
import axios from "axios";
import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function call(endpoint: string, data: object) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`/api/auth/${endpoint}`, data, { withCredentials: true });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { call, loading, error };
}
