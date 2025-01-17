/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      // Redirect based on role
      if (result.user.role === "admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/user-dashboard";
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto max-w-md py-12 px-4">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Login
          </h1>
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            {errorMessage && (
              <p className="text-red-500 text-center text-sm mb-4">
                {errorMessage}
              </p>
            )}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <Link
                href="/Register"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transform transition-all duration-300 hover:scale-105"
              >
                Don&apos;t have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <footer className="py-4 bg-blue-100 text-center">
        <p className="text-gray-600 text-sm">
          © 2025 Your App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
