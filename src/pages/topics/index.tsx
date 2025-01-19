import { useState, useEffect } from "react";
import Link from "next/link";
import "../../styles/globals.css"
// Define types for topic data
type Topic = {
  id: number;
  title: string;
  description: string;
};

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]); // Explicitly define state type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/auth/topics");
        const result = await response.json();
        setTopics(result.data || []); // Ensure topics is an array
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      <Link href="/topics/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
          Create New Topic
        </button>
      </Link>
      <ul className="mt-4">
        {topics.map((topic) => (
          <li key={topic.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
            <Link href={`/topics/${topic.id}`}>
              <a className="text-blue-500 hover:underline">View Topic</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
