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

      localStorage.setItem("userId", result.user.id);

      if (result.user.role === "admin") {
        window.location.href = "/adminDashboard";
      } else {
        window.location.href = "/userDashboard";
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
              <Link
                href="/Register"
                className="text-sm font-bold text-blue-500 hover:text-blue-700"
              >
                Don&apos;t have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <footer className="py-4 bg-blue-100 text-center">
        <p className="text-gray-600 text-sm">© 2025 Your App. All rights reserved.</p>
      </footer>
    </div>
  );
}
