import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchTopics } from "@/utils/forumHelpers"; // Import helper function

type Topic = {
  id: number;
  title: string;
  description: string;
};

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      const data = await fetchTopics(); // Fetch topics using helper
      setTopics(data); // Set fetched data
      setLoading(false); // Stop loading indicator
    };

    loadTopics();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading indicator

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      <Link href="/topics/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
          Create New Topic
        </button>
      </Link>
      <ul className="mt-4 space-y-4">
        {topics.map((topic) => (
          <li key={topic.id} className="p-4 border rounded shadow-sm">
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
