import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchUser, User } from "@/utils/validate";
import { search, SearchResult } from "@/utils/forumHelpers";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState(""); // State untuk input pencarian
  const [results, setResults] = useState<SearchResult[]>([]); // State untuk hasil pencarian

  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };

    loadUser();
  }, []);

  const handleSearch = async () => {
    const searchResults = await search(query); // Panggil fungsi pencarian dari file utility
    setResults(searchResults); // Set hasil pencarian ke state
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-teal-500">CalmTunes</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Input Pencarian */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Perbarui query berdasarkan input pengguna
              className="pl-4 pr-8 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 4v16m8-16v16M3 8h18M3 16h18"
                />
              </svg>
            </button>
          </div>

          {/* Hasil Pencarian */}
          {results.length > 0 && (
            <div className="absolute bg-white border rounded-md mt-2 p-2 w-80 shadow-lg">
              {results.map((result) => (
                <div key={result.id} className="p-2 hover:bg-gray-100">
                  <h3 className="font-semibold">{result.title}</h3>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ikon Notifikasi */}
          <Link href="/notifications" className="hover:text-teal-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.121V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.121c0 .417-.161.816-.405 1.111L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
              />
            </svg>
          </Link>

          {/* Jika user tersedia, tampilkan detail user */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              <img
                src="/profile-placeholder.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700">{user.username}</span>
                <span className="block text-xs text-gray-500">{user.role}</span>
              </div>
            </Link>
          ) : (
            <Link
              href="/Login"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
