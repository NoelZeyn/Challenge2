/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import '../styles/globals.css'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const validateAdmin = async () => {
      try {
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

        setLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred.");
        router.push("/Login");
      }
    };

    validateAdmin();
  }, [router]);

  useEffect(() => {
    if (activeTab === "log") fetchLogs();
  }, [activeTab]);

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/auth/logs");
      const result = await response.json();
      if (response.ok) setLogs(result.logs);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 bg-blue-800 text-white h-full shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin ERP</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              className={`p-4 hover:bg-blue-700 cursor-pointer ${
                activeTab === "dashboard" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`p-4 hover:bg-blue-700 cursor-pointer ${
                activeTab === "users" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </li>
            <li
              className={`p-4 hover:bg-blue-700 cursor-pointer ${
                activeTab === "songs" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveTab("songs")}
            >
              Songs
            </li>
            <li
              className={`p-4 hover:bg-blue-700 cursor-pointer ${
                activeTab === "log" ? "bg-blue-700" : ""
              }`}
              onClick={() => setActiveTab("log")}
            >
              Log
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        <header className="flex justify-between items-center bg-white shadow p-4 rounded-md">
          <h1 className="text-3xl font-bold text-gray-700">Welcome, Admin</h1>
          <button
            onClick={() => {
              localStorage.removeItem("userId");
              router.push("/Login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </header>

        <div className="mt-6 text-gray-700">
          {activeTab === "dashboard" && (
            <section>
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p>This is the dashboard overview.</p>
            </section>
          )}
          {activeTab === "users" && (
            <section>
              <h2 className="text-2xl font-bold text-gray-700">Manage Users</h2>
              {/* CRUD operations for Users */}
              <p>Implement User CRUD operations here.</p>
            </section>
          )}
          {activeTab === "songs" && (
            <section>
              <h2 className="text-2xl font-bold text-gray-700">Manage Songs</h2>
              {/* CRUD operations for Songs */}
              <p>Implement Song CRUD operations here.</p>
            </section>
          )}
          {activeTab === "log" && (
            <section>
              <h2 className="text-2xl font-bold ">Activity Log</h2>
              <div className="overflow-x-auto bg-white shadow rounded-md mt-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-200 text-black">
                      <th className="p-4">Admin</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Target</th>
                      <th className="p-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log: any) => (
                      <tr key={log.id} className="border-t text-black">
                        <td className="p-4">{log.admin_id}</td>
                        <td className="p-4">{log.action}</td>
                        <td className="p-4">{log.target}</td>
                        <td className="p-4">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
