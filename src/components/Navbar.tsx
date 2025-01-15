import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MusicStream</h1>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
