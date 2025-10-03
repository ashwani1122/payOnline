import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Heading from "../components/Heading";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token] = useState<string | null>(localStorage.getItem("token"));
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const handleSendMoney = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(
        "https://payonline.onrender.com/api/v1/user/transferMoney",
        {
          amount,
          to: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSuccess(`Rs ${amount.toFixed(2)} sent to ${name}`);
    } catch (error) {
      console.error("Failed to send money:", error);
      setError("Failed to send money. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl animate-fade-in">
        {/* Heading */}
        <Heading
          Label="Send Money"
        />

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 text-red-700 p-3 rounded-lg shadow-sm mb-4 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-full bg-green-50 text-green-700 p-3 rounded-lg shadow-sm mb-4 text-center animate-fade-in">
            {success}
          </div>
        )}

        {/* User Avatar + Name */}
        <div className="flex items-center gap-3 mb-6">
          <span className="rounded-full h-12 w-12 bg-blue-100 text-blue-600 flex justify-center items-center text-xl font-semibold">
            {name?.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg sm:text-xl font-medium text-gray-800">
            {name?.toUpperCase()}
          </span>
        </div>

        {/* Amount Input */}
        <div className="w-full mb-6">
          <input
            type="number"
            value={amount || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
            }
            placeholder="Enter Amount (Rs)"
            className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 font-medium placeholder-gray-400"
            disabled={loading}
          />
        </div>

        {/* Send Money Button */}
        <Button
          onClick={handleSendMoney}
          label={loading ? "Sending..." : "Send Money"}
          className={`w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
}