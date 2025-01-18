import React from "react";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import '../styles/globals.css'

export default function Login() {
  return (
    <div className="bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
