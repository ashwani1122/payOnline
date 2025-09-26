import { useNavigate } from "react-router-dom";
import Logout from "./logout";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <p
          className="text-2xl font-bold text-white cursor-pointer hover:text-gray-200 transition"
          onClick={() => {
            navigate("/");
          }}
        >
          PayTM App
        </p>

        {/* Right section (logout button) */}
        <div className="flex items-center space-x-4">
          <Logout />
        </div>
      </div>
    </header>
  );
}
