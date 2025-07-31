import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  organizationId?: string;
}

const Allusers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/all-users",
          {
            withCredentials: true,
          }
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {user.name}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.organizationId && (
              <p className="text-xs text-gray-400 mt-1">
                Org ID: {user.organizationId}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allusers;
