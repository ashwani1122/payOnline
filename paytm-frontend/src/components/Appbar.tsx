import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./logout";

export default function Appbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo / Title */}
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            className="w-8 h-8 text-blue-600 group-hover:text-blue-500 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zM5 12h2m12 0h-2M3 9v6m18-6v6"
            />
          </svg>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            PayTM App
          </p>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <Logout />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md px-4 py-4 shadow-md animate-slide-down">
          <Logout />
        </div>
      )}
    </header>
  );
}