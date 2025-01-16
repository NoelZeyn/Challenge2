/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { supabase } from "@/lib/supabase";
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  return (
      <div className="bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100">
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
                  href="/register"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transform transition-all duration-300 hover:scale-105 "
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
