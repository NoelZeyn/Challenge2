/* eslint-disable @typescript-eslint/no-explicit-any */
export async function validateAdminRole(): Promise<void> {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("Unauthorized");
  
    const response = await fetch("/api/auth/validaterole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  
    const result = await response.json();
    if (!response.ok || result.role !== "admin") {
      throw new Error(result.message || "Access denied");
    }
  }
  
  export async function validateGeneralRole(): Promise<void> {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("Unauthorized");
  
    const response = await fetch("/api/auth/validaterole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  
    const result = await response.json();
    if (!response.ok || result.role !== "general") {
      throw new Error(result.message || "Access denied");
    }
  }
  