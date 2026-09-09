import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to AccessHub
          </h1>
          <p className="text-lg text-indigo-100 mb-10">
            A secure authentication system with role-based access control,
            built with Next.js, Prisma, and JWT. Register an account or log
            in to see it in action.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}