/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/adminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/HeaderAdmin";
import UserForm from "@/components/UserForm";
import { validateAdminRole, fetchTabData, tableConfig } from "@/utils/adminHelpers";
import '../styles/globals.css'
const AdminDashboard: React.FC = () => {
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

  const handleUserInsert = async (formData: { username: string; email: string; password: string }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    setData([...data, result.data]);
  };

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4">
        <Header />
        {activeTab === "users" && <UserForm onSubmit={handleUserInsert} />}
        {renderTable()}
      </main>
    </div>
  );
};

export default AdminDashboard;
