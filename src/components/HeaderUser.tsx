import Link from "next/link";

export const Header: React.FC = () => (
  <header className="text-center mb-6">
    <h1 className="text-3xl font-bold mb-4">Welcome to User Dashboard</h1>
    <p className="mb-6">Explore topics and participate in discussions!</p>
    <Link href="/topics/new">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Create New Topic
      </button>
    </Link>
  </header>
);
