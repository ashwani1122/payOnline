import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center text-white">
                {token ?<Button label="Logout" onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/")
                }}  />:<Button label="Login" onClick={()=>{
                    navigate("/signup")
                }}  />}
        </div>
    )
}