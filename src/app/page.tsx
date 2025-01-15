"use client";
import SongFetcher from "@/components/SongFetcher";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100">
      <Navbar />
      <header className="text-center py-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Discover Your Favorite Tunes
        </h1>
        <p className="text-gray-600 mt-2">
          Explore and play your favorite songs seamlessly.
        </p>
      </header>
      <SongFetcher />
    </div>
  );
}
