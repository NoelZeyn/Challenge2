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
      throw new Error("Access denied");
    }
  }
  
  export async function fetchTabData(activeTab: string): Promise<any[]> {
    let endpoint = "";
    if (activeTab === "log") endpoint = "/api/logs";
    if (activeTab === "users") endpoint = "/api/users";
    if (activeTab === "songs") endpoint = "/api/songs";
  
    if (!endpoint) return [];
  
    const response = await fetch(endpoint);
    const result = await response.json();
  
    if (!response.ok) throw new Error(`Failed to fetch ${activeTab} data`);
    return result.data || result.logs || [];
  }

  
  export const tableConfig: Record<string, { headers: string[]; dataKey: string[] }> = {
    users: {
      headers: ["ID", "Username", "Email", "Role", "Action"],
      dataKey: ["id", "username", "email", "role"],
    },
    songs: {
      headers: ["Title", "Artist", "Album", "URL", "YouTube URL"],
      dataKey: ["title", "artist", "album", "url", "url_yt"],
    },
    log: {
      headers: ["Admin", "Action", "Target", "Timestamp"],
      dataKey: ["admin_id", "action", "target", "timestamp"],
    },
  };