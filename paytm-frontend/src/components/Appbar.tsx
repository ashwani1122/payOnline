
import Logout from "./logout";
import { useNavigate } from "react-router-dom";
export default function Appbar(){
    const navigate = useNavigate();
    return(
        <div className="  flex justify-between items-center fixed top-0 w-full bg-black">
            <div className="flex  w-full items-center text-white justify-between
            shadow-lg border-gray-400
            h-full text-2xl px-4 py-2 bg-black">
                <p className="cursor-pointer" onClick={()=>{navigate("/")}}>PayTM App</p>
            
            </div>
            <span className="flex   items-center  justify-end">
            <Logout/>
            </span>
        </div>
    )
}