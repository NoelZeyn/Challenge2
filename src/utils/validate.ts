 
export async function validateAdminRole(): Promise<void> {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("Unauthorized");

  const response = await fetch("/api/auth/users/validaterole", {
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

  const response = await fetch("/api/auth/users/validaterole", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  
  const result = await response.json();
  console.log(result);
  if (!response.ok || result.role !== "general") {
    throw new Error(result.message || "Access denied");
  }
}

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export async function fetchUser(): Promise<User | null> {
  const userId = localStorage.getItem("userId"); // Ambil user ID dari localStorage
  if (!userId) return null;

  try {
    const response = await fetch(`/api/auth/users/${userId}`); // Panggil API Anda

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const { success, data } = await response.json();

    if (success && data) {
      return data; // Return user data
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
