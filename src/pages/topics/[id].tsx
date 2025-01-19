import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchTopicDetails, fetchComments, postComment } from "@/utils/forumHelpers";
import "../../styles/globals.css";

type Topic = {
  id: number;
  title: string;
  description: string;
};

type Comment = {
  id: number;
  content: string;
  users: {
    username: string;
    role: string;
  };
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{topic.title}</h1>
      <p>{topic.description}</p>
      <h2 className="text-2xl font-semibold mt-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <p>{comment.content}</p>
          <p className="text-sm text-gray-500">
            By: {comment.users.username} ({comment.users.role})
          </p>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="block w-full mb-4 p-2 border"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TopicDetails;
