import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const navigate = useNavigate();
  const [token] = useState<string | null>(localStorage.getItem("token"));

  return (
    <div className="w-full space-y-4">
      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No users found</p>
      ) : (
        users.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 text-xl font-semibold">
                {user.firstName[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Send Money Button */}
            {token && (
              <Button
                label="Send Money"
                onClick={() => {
                  navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}