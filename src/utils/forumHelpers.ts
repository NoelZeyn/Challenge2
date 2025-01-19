/* eslint-disable @typescript-eslint/no-explicit-any */
// Fetch topic details by ID
export const fetchTopicDetails = async (id: string): Promise<any> => {
    try {
      const response = await fetch(`/api/auth/topics/${id}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch topic details");
      return result.data;
    } catch (error) {
      console.error("Error fetching topic details:", error);
      return null;
    }
  };
  
  // Fetch comments for a topic by ID
  export const fetchComments = async (topicId: string): Promise<any[]> => {
    try {
      const response = await fetch(`/api/auth/comments?topicId=${topicId}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch comments");
      return result.data || [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };
  
  // Post a new comment
  export const postComment = async (
    topicId: string,
    content: string,
    userId: string
  ): Promise<any> => {
    try {
      const response = await fetch("/api/auth/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, content, userId }),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to post comment");
      return result.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  };
  
  export async function fetchTopics(): Promise<any[]> {
    try {
      const response = await fetch("/api/auth/topics");
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch topics");
      return result.data || [];
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      return [];
    }
  }
  
  // Create a new topic
export const createTopic = async (title: string, description: string): Promise<void> => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User is not logged in.");
  
      const response = await fetch("/api/auth/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, userId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create topic.");
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  };
  

//     const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage("");

//     try {
//       const response = await fetch("/api/auth/topics", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, description, userId: localStorage.getItem("userId") }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create topic.");
//       }

//       router.push("/topics");
//     } catch (error: any) {
//       setErrorMessage(error.message);
//     }
//   };