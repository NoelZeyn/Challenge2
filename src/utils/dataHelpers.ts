/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchTabData(activeTab: string): Promise<any[]> {
  const endpoints: Record<string, string> = {
    log: "/api/auth/logs",
    users: "/api/auth/users",
    songs: "/api/auth/songs",
  };

  const endpoint = endpoints[activeTab];
  if (!endpoint) return [];

  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || `Failed to fetch ${activeTab} data`);
    return result.data || result.logs || [];
  } catch (error) {
    console.error(`Error fetching data for ${activeTab}:`, error);
    return [];
  }
}

export const tableConfig: Record<string, { headers: string[]; dataKey: string[] }> = {
  users: {
    headers: ["ID", "Username", "Email", "Role"],
    dataKey: ["id", "username", "email", "role"],
  },
  songs: {
    headers: ["Title", "Artist", "Album", "Genre", "URL", "YouTube URL"],
    dataKey: ["title", "artist", "album", "genre", "url", "url_yt"],
  },
  log: {
    headers: ["Admin", "Action", "Target", "Timestamp"],
    dataKey: ["admin_id", "action", "target", "timestamp"],
  },
};

export async function handleUserInsert(
  formData: { username: string; email: string; password: string },
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
  try {
    const adminId = localStorage.getItem("userId");
    if (!adminId) throw new Error("Admin ID is missing!");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    setData((prevData) => [...prevData, result.data]);
  } catch (error: any) {
    setErrorMessage(error.message || "Failed to add user.");
  }
}

export async function handleSongInsert(
  formData: { title: string; artist: string; album: string; genre: string; url: string },
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
  try {
    const response = await fetch("/api/auth/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
  } catch (error: any) {
    setErrorMessage(error.message || "Failed to add song");
  }
}

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
