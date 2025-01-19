/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
        const response = await fetch("api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password}),
        });

        const result= await response.json();
        if(!result.ok) throw new Error(result.message);

        setSuccessMessage("Registration successfull! Please log in.")
        setUsername("")
        setEmail("")
        setPassword("")
    } catch (error: any) {
        setErrorMessage(error.message || "An error has occured during registration")
    }

  };

  return (
    <div className="bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100 min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Register
          </h1>
          {successMessage && (
            <p className="text-green-500 text-center text-sm mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your username"
                required
              />
            </div>
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
                className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full border rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block bg-blue-500 text-white py-2 px-6 rounded shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register
              </button>
              <Link
                href="/Login"
                className="text-sm font-bold text-blue-500 hover:text-blue-700"
              >
                Already have an account? Login
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
};

export default RegisterForm;
