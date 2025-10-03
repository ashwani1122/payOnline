import { useEffect, useState } from "react";
import axios from "axios";

import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Input from "../components/input";
import UserList from "../components/UserList";

export default function Dashboard() {

  type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  interface Balance{
    balance: number;
  }
  type UserResponse = {
    users: User[];
    success: boolean;
  };
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [balance, setBalance] = useState<Balance>({ balance: 0 });

  useEffect(() => {
    axios
      .get<{ balance: Balance}>(
        "https://payonline.onrender.com/api/v1/user/balanceInquiry",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  // Fetch users
  useEffect(() => {
    axios
      .get<UserResponse>(
        `https://payonline.onrender.com/api/v1/user/bulk?filter=${filter}`
      )
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filter, token]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 flex flex-col">
      {/* Top Navbar */}
      <div className="shadow-md bg-white sticky top-0 z-10">
        <Appbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-1 py-10 px-4 gap-8 color-black">
        {/* Balance card */}
        {token && (
        <div className="w-full max-w-md  rounded-xl shadow-lg mt-20 p-6 bg-white">
                <Balance balance={balance.balance} />
            
        </div>
        )}

        {/* Search box */}
        <div className="w-full max-w-md">
        <Input
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
            }
            Label=""
            placeholder="🔍 Search for users..."
        />
        </div>

        {/* User list */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Available Users
        </h2>
        <UserList users={users} />
        </div>
    </div>
    </div>
  );
}
