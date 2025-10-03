import { useEffect, useState } from "react";
import axios from "axios";

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

  // Listen for storage changes (e.g., token set during login)
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    // Listen for storage events (triggered when localStorage changes in another tab)
    window.addEventListener("storage", handleStorageChange);

    // Optionally, poll localStorage for changes in the same tab
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000); // Check every second

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  // Fetch balance
  useEffect(() => {
    if (!token) return; // Skip if no token

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
      })
      .catch((error) => {
        console.error("Failed to fetch balance:", error);
      });
  }, [token]);

  // Fetch users
  useEffect(() => {
    if (!token) return; // Skip if no token

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
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, [filter, token]);

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 flex flex-col">
      {/* Top Navbar */}
      <div className="shadow-md bg-white sticky top-0 z-10">
        <Appbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-1 py-10 px-4 gap-8 color-black">
        {/* Balance card */}
        {token ? (
          <div className="w-full max-w-md rounded-xl shadow-lg mt-20 p-6 bg-white">
            <Balance balance={balance.balance} />
          </div>
        ) : null}

        {/* Search box */}
        <div className="w-full max-w-md">
          {token ? (
            <Input
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
              Label=""
              placeholder="🔍 Search for users..."
            />
          ) : null}
        </div>

        {/* User list */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Available Users
          </h2>
          
          <UserList users={users} />
        </div>
       {!token&& <div className="mb-4  bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 mt-6 flex justify-center items-center text-center text-black text-2xl h-96">
            Login for more features
          </div>}
      </div>
    </div>
  );
}