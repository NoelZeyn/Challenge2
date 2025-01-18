// components/Header.tsx
import React from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/Login");
  };

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center bg-white shadow p-4 rounded-md">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-700">Welcome, Admin</h1>
      <button
        onClick={handleLogout}
        className="mt-4 lg:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
