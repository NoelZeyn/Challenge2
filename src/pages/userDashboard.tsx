/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/globals.css";

// Define types for topics
type Topic = {
  id: number;
  title: string;
  description: string;
};

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No userId in localStorage");
          throw new Error("Unauthorized");
        }

        const response = await fetch("/api/auth/validaterole", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();

        if (!response.ok || !result.role) {
          throw new Error("Unable to fetch user role.");
        }

        if (result.role === "admin") {
          // Redirect admin to AdminDashboard
          router.push("/adminDashboard");
        } else if (result.role !== "general") {
          // If the role is unknown or unauthorized
          throw new Error("Unauthorized access.");
        }

        fetchTopics(); // Fetch topics after successful validation
        setLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred.");
        router.push("/Login");
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/auth/topics");
        const result = await response.json();
        setTopics(result.data || []);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    validateUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to User Dashboard</h1>
      <p className="mb-6">Explore topics and participate in discussions!</p>
      <Link href="/topics/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Create New Topic
        </button>
      </Link>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Available Topics</h2>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-xl font-bold">{topic.title}</h3>
            <p className="text-gray-600">{topic.description}</p>
            <Link href={`/topics/${topic.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              Join Discussion
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
