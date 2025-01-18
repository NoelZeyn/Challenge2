// components/Sidebar.tsx
import React from "react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
  <aside className="w-full lg:w-64 bg-blue-800 text-white h-auto lg:h-screen shadow-lg">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center lg:text-left">Admin Manager</h2>
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
);

export default Sidebar;
