/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoginForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      localStorage.setItem("userId", result.user.id);

      if (result.user.role === "admin") {
        router.push("/adminDashboard");
      } else {
        router.push("/userDashboard");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login</h1>
      {errorMessage && (
        <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
          <Link href="/Register" className="text-sm font-bold text-blue-500 hover:text-blue-700">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
