/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/HeaderAdmin";
import UserForm from "@/components/UserForm";
import SongForm from "@/components/SongForm";
import {
  validateAdminRole,
  fetchTabData,
  tableConfig,
  handleUserInsert,
  handleSongInsert,
} from "@/utils/adminHelpers";
import "../styles/globals.css";

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
        .then(setData)
        .catch(() => setErrorMessage(`Failed to fetch ${activeTab} data.`));
    }
  }, [activeTab]);

  const handleUserFormSubmit = (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    handleUserInsert(formData, setData, setErrorMessage).catch((error) => {
      console.error("Error inserting user:", error);
    });
  };
  const handleSongFormSubmit = (formData: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    url: string;
    url_yt: string;
  }) => {
    handleSongInsert(formData, setErrorMessage).catch((error) => {
      console.error("Error inserting user:", error);
    });
  };

  const renderTable = () => {
    const config = tableConfig[activeTab];
    if (!config)
      return (
        <p className="text-center mt-4 text-lg font-semibold">
          This is the dashboard overview.
        </p>
      );

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
            {data.map((item, index) => (
              <tr key={item?.id || index} className="border-t text-black">
                {config.dataKey.map((key) => (
                  <td key={key} className="p-4 text-sm">
                    {item?.[key] !== undefined ? (
                      key === "url" || key === "url_yt" ? (
                        <a
                          href={item[key]}
                          className="text-blue-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      ) : key === "timestamp" ? (
                        new Date(item[key]).toLocaleString()
                      ) : (
                        item[key]
                      )
                    ) : (
                      <span className="text-gray-500">N/A</span>
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

  if (loading)
    return (
      <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    );
  if (errorMessage)
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        {errorMessage}
      </p>
    );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4">
        <Header />
        {activeTab === "users" && <UserForm onSubmit={handleUserFormSubmit} />}
        {activeTab === "songs" && <SongForm onSubmit={handleSongFormSubmit} />}
        {renderTable()}
      </main>
    </div>
  );
};

export default AdminDashboard;
