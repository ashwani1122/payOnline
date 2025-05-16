
import Logout from "./logout";

export default function Appbar(){
        const token = localStorage.getItem('token');
    return(
        <div className="  flex justify-between items-center  w-full  rounded-md mt-4 ">
            <div className="flex  w-full items-center text-white justify-between
            shadow-lg border-gray-400
            h-full text-2xl px-4 py-2">
            PayTM App
            </div>
            <span className="flex   items-center  justify-end">
            <Logout/>
            </span>
        </div>
    )
}