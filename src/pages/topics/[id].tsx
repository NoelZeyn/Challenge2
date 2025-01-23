/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/NavbarUser";
import {
  fetchTopicDetails,
  fetchComments,
  postComment,
  likeComment,
  getlikeComment,
} from "@/utils/forumHelpers";
import "../../styles/globals.css";

type Topic = {
  id: number;
  title: string;
  description: string;
  users: {
    username: string;
    role: string;
  };
};

type Comment = {
  id: number;
  content: string;
  users: {
    username: string;
    role: string;
  };
  likes: number; // Tambahkan properti ini
};

const TopicDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadTopicAndComments = async () => {
      const topicData = await fetchTopicDetails(id as string);
      const commentsData = await fetchComments(id as string);
      setTopic(topicData);
      setComments(commentsData);
    };

    loadTopicAndComments();
  }, [id]);

  // Poll likes for all comments every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedComments = await Promise.all(
          comments.map(async (comment) => {
            const result = await getlikeComment(comment.id);
            return { ...comment, likes: result.likes || 0 };
          })
        );
        setComments(updatedComments);
      } catch (error) {
        console.error("Failed to update likes:", error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [comments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add a comment.");
      return;
    }

    const newCommentData = await postComment(id as string, newComment, userId);
    setComments((prev) => [...prev, newCommentData]);
    setNewComment("");
  };

  if (!topic) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen text-black mx-auto p-6 bg-gradient-to-b from-teal-100 via-blue-50 to-blue-100">
        <div className="mb-6 p-4 rounded-lg border bg-white shadow-sm">
          <div className="mb-6 p-4 rounded-lg border bg-white shadow-xl">
            <h1 className="text-3xl font-bold">{topic.title}</h1>
            <p>{topic.description}</p>
            <p>By: {topic.users.username}</p>
          </div>
          <div className="mb-6 p-4 rounded-lg border bg-white shadow-xl">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="block w-full mb-4 p-2 border"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>

          <h2 className="text-2xl font-semibold mt-4">Comments</h2>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-6 p-4 rounded-lg border bg-white shadow-sm"
            >
              <div className="flex items-center mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {comment.users.username} ({comment.users.role})
                  </h4>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              <div className="flex items-center mt-4 text-sm text-gray-500 space-x-6">
                <button
                  onClick={async () => {
                    try {
                      const result = await likeComment(comment.id);
                      setComments((prev) =>
                        prev.map((c) =>
                          c.id === comment.id
                            ? { ...c, likes: result.data.likes }
                            : c
                        )
                      );
                    } catch {
                      alert("Failed to like the comment");
                    }
                  }}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  <span>{comment.likes} Like </span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
