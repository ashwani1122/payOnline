import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Input from "../components/input";
import UserList from "../components/UserList";

export default function Dashboard() {
  // Types
  type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  interface Balance {
    balance: number;
  }

  type UserResponse = {
    users: User[];
    success: boolean;
  };

  // State
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [balance, setBalance] = useState<Balance>({ balance: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  // Fetch balance
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    axios
      .get<{ balance: Balance }>(
        "https://payonline.onrender.com/api/v1/user/balanceInquiry",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setBalance(response.data.balance);
        setError(null);
      })
      .catch((error) => {
        console.error("Failed to fetch balance:", error);
        setError("Failed to load balance. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Fetch users
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    axios
      .get<UserResponse>(
        `https://payonline.onrender.com/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setUsers(response.data.users);
        setError(null);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [filter, token]);

  // Render
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Appbar */}
      <Appbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-1 pt-20 pb-12 px-4 sm:px-6 lg:px-8 gap-8 mt-10">
        {/* Loading State */}
        {loading && (
          <div className="w-full max-w-md text-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-md bg-red-50 text-red-700 p-4 rounded-xl shadow-md text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Balance Card */}
        {token && !loading && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in mt-10">
            <Balance balance={balance.balance} />
          </div>
        )}

        {/* Search Box */}
        {token && !loading && (
          <div className="w-full max-w-md">
            <Input
              disabled={loading}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
              Label="Search Users"
              placeholder="🔍 Search for users..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm"
            />
          </div>
        )}

        {/* User List or Login Prompt */}
        {token ? (
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
              Available Users
            </h2>
            <UserList users={users} />
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center min-h-[450px] transform transition-all duration-300 hover:shadow-xl animate-fade-in">
            <svg
              className="w-20 h-20 text-blue-500 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0c-1.1 0-2 .9-2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m6 2c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0c-1.1 0-2 .9-2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2"
              />
            </svg>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Unlock Your Dashboard
            </h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
              Sign in to access your balance, search users, and manage transactions.
            </p>
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Sign In Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}