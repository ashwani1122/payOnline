import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input";

import WarningButton from "../components/WarningButton";

export default function Signup() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("https://payonline.onrender.com/api/v1/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center  font-sans bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-md  mt-20  w-full h-screen fixed ">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 transform transition-all duration-300 mb-10">
        {/* Heading */}
        <Heading
          Label="Sign Up"
         />
        

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 text-red-700 p-3 rounded-lg shadow-sm mb-4 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* First Name Input */}
        <Input
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          Label="First Name"
          placeholder="Enter your first name"
          className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 mb-4"
          disabled={loading}
        />

        {/* Last Name Input */}
        <Input
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          Label="Last Name"
          placeholder="Enter your last name"
          className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 mb-4"
          disabled={loading}
        />

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

        {/* Signup Button */}
        <Button
          label={loading ? "Signing Up..." : "Sign Up"}
          onClick={handleSignup}
          className={`w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />

        {/* Signin Link */}
        <WarningButton
          buttonText="Signin"
          to="/signin"
          className="mt-4 text-center text-gray-600"
          lable="Already have an account?"
        />
      </div>
    </div>
  );
}