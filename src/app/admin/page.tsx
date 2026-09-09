"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type User = { id: number; email: string; username: string; role: string };

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) router.push("/dashboard");
        else setUsers(data);
      });
  }, [router]);

  return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
      <Navbar />
      <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel — All Users</h1>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="pb-2">Username</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.username}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}