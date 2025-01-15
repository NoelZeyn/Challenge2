import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-500">CalmTunes</h1>
        <div className="space-x-4">
          <Link
            href="/"
            className="text-gray-600 hover:text-teal-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/Sign-in"
            className="text-gray-600 hover:text-teal-500 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
