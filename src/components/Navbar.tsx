import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        AccessHub
      </Link>
      <div className="flex gap-6">
        <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
          Login
        </Link>
        <Link href="/register" className="text-gray-700 hover:text-indigo-600 font-medium">
          Register
        </Link>
      </div>
    </nav>
  );
}