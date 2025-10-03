import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center text-white px-6  rounded-md">
                {token ?<Button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg" label="Logout" onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/")
                }}  />:<Button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg" label="Login" onClick={()=>{
                    navigate("/signup")
                }}  />}
        </div>
    )
}