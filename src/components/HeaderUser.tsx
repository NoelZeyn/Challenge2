import Link from "next/link";

export const Header: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="text-center mb-6 px-4">
      <h1 className="text-4xl font-bold mb-4">{getGreeting()}, Welcome to User Dashboard</h1>
      <p className="mb-6 text-gray-700">Explore topics and participate in discussions!</p>
      <Link href="/topics/new">
        <button className="inline-block bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
          Create New Topic
        </button>
      </Link>
    </header>
  );
};
