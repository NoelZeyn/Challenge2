/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { validateAdminRole, fetchTabData, tableConfig } from "@/utils/adminHelpers";
import "../styles/globals.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const validateAndFetch = async () => {
      try {
        await validateAdminRole();
        setLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred.");
        router.push("/Login");
      }
    };

    validateAndFetch();
  }, [router]);

  useEffect(() => {
    if (activeTab !== "dashboard") {
      fetchTabData(activeTab)
        .then((fetchedData) => setData(fetchedData))
        .catch((error) => console.error(`Failed to fetch ${activeTab} data:`, error));
    }
  }, [activeTab]);

  if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading...</p>;
  if (errorMessage) return <p className="text-center mt-20 text-red-500 text-lg font-semibold">{errorMessage}</p>;

  const renderTable = () => {
    const config = tableConfig[activeTab];
    if (!config) return <p className="text-center mt-4 text-lg font-semibold">This is the dashboard overview.</p>;

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-black">
              {config.headers.map((header) => (
                <th key={header} className="p-4 text-sm font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id || item.timestamp} className="border-t text-black">
                {config.dataKey.map((key) => (
                  <td key={key} className="p-4 text-sm">
                    {key === "url" || key === "url_yt" ? (
                      <a href={item[key]} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        Link
                      </a>
                    ) : key === "timestamp" ? (
                      new Date(item[key]).toLocaleString()
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-blue-800 text-white h-auto lg:h-screen shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center lg:text-left">Admin ERP</h2>
        </div>
        <nav className="mt-4">
          <ul className="flex lg:block overflow-x-auto whitespace-nowrap">
            {["dashboard", "users", "songs", "log"].map((tab) => (
              <li
                key={tab}
                className={`p-4 text-center lg:text-left hover:bg-blue-700 cursor-pointer ${
                  activeTab === tab ? "bg-blue-700" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <header className="flex flex-col lg:flex-row justify-between items-center bg-white shadow p-4 rounded-md">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-700">Welcome, Admin</h1>
          <button
            onClick={() => {
              localStorage.removeItem("userId");
              router.push("/Login");
            }}
            className="mt-4 lg:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </header>

        <div className="mt-6 bg-white shadow p-4 rounded-md">{renderTable()}</div>
      </main>
    </div>
  );
}
