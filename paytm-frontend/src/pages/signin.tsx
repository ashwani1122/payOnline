import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input";
import SubHeading from "../components/Subheading";
import WarningButton from "../components/WarningButton";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ token: string }>(
        "https://payonline.onrender.com/api/v1/user/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 transform transition-all duration-300 hover:shadow-xl animate-fade-in">
        {/* Heading */}
        <Heading
          Label="Sign In"
          />
        <SubHeading
          Label="Enter your credentials to access your account"
        />

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 text-red-700 p-3 rounded-lg shadow-sm mb-4 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Email Input */}
        <Input
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          Label="Email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 mb-4"
          disabled={loading}
        />

        {/* Password Input */}
        <Input
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          Label="Password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 mb-6"
          disabled={loading}
        />

        {/* Sign In Button */}
        <Button
          label={loading ? "Signing In..." : "Sign In"}
          onClick={handleSignIn}
          className={`w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />

        {/* Signup Link */}
        <WarningButton
          lable="Don't have an account?"
          buttonText="Sign Up"
          to="/signup"
          className="mt-4 text-center text-gray-600"
         />
      </div>
    </div>
  );
}