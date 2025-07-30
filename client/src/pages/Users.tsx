import { useEffect, useState } from "react";
import type { User } from "../../types/userType"

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/all-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUsers(data.users);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-2xl bg-gray-700 w-full font-bold">Users Page</h1>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center bg-gray-300 p-4 rounded-lg">
        {users.map((user) => (
          <ul key={user._id}>
            <li>Name: {user.name}</li>
            <li>Role: {user.role}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
