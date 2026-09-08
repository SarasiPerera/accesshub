"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { id: number; email: string; username: string; role: string };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) router.push("/login");
        else setUser(data);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Log out
          </button>
        </div>

        <p className="text-gray-700">
          Welcome, <span className="font-semibold">{user.username}</span>!
        </p>
        <p className="text-gray-500 text-sm mt-1">Email: {user.email}</p>
        <p className="text-gray-500 text-sm">Role: {user.role}</p>

        {user.role === "ADMIN" && (
          <a href="/admin" className="inline-block mt-4 text-blue-600 hover:underline text-sm">
            Go to Admin Panel
          </a>
        )}
      </div>
    </div>
  );
}