/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchTopics } from "@/utils/forumHelpers";
import { validateGeneralRole } from "@/utils/validate";
import { TopicList } from "@/components/TopicList";
import { Header } from "@/components/HeaderUser";
import NavbarUser from "@/components/NavbarUser";

import "../styles/globals.css";
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
        if (!userId) throw new Error("Unauthorized");

        await validateGeneralRole();
        const topicsData = await fetchTopics();
        setTopics(topicsData);
        setLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred.");
        router.push("/Login");
      }
    };

    validateUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div>
      <NavbarUser />
      <div className="min-h-screen text-black mx-auto p-6 bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100">
        <Header />
        <h2 className="text-2xl font-semibold mt-6 mb-4">Available Topics</h2>
        <TopicList topics={topics} />
      </div>
    </div>
  );
}
