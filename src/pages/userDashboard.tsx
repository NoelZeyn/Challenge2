/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import '../styles/globals.css'

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No userId in localStorage");
          throw new Error("Unauthorized");
        }

        console.log("Validating user with userId:", userId);

        const response = await fetch("/api/auth/validaterole", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        console.log("API Response:", result);

        setLoading(false);
      } catch (error: any) {
        console.error("Validation error:", error.message);
        setErrorMessage(error.message || "An error occurred.");
        router.push("/Login");
      }
    };

    validateUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Welcome to User Dashboard</h1>
      <p>This is the general user area.</p>
    </div>
  );
}
