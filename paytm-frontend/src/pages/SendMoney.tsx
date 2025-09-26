import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Heading from "../components/Heading";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const [loading , setLoading] = useState(false);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 py-4 bg-white">
      <div
        key={id}
        className="flex flex-col justify-center px-5 items-center gap-5 shadow-lg rounded-md border-2 border-gray-300 bg-white-700"
      >
        <Heading Label="Send Money" />

        {/* User avatar + name */}
        <div className="flex justify-center items-center pr-10 gap-1">
          <span className="rounded-full h-12 w-12 bg-green-700 flex justify-center items-center text-xl text-black">
            {name?.charAt(0).toUpperCase()}
          </span>
          <span className="flex justify-center items-center text-black text-xl">
            {name?.toUpperCase()}
          </span>
        </div>

        {/* Amount input */}
        <div className="w-full">
          <input
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2 w-full text-black font-bold"
            placeholder="Enter Amount"
            onChange={(e: any) => setAmount(e.target.value)}
          />
        </div>

        {/* Send Money button */}
        <Button
          onClick={async () => {
            await axios.post(
              "https://payonline.onrender.com/api/v1/user/transferMoney",
              {
                amount,
                to: id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );

            alert(`${amount} Rs sent to ${name}`);
          } 
        
        }
          label="Send Money"
        />
      </div>
    </div>
  );
}
