
import { Link } from "react-router-dom";
export default function WarningButton({lable , buttonText , to}: {lable: string, buttonText: string, to: string}){
    return(
        <div className="flex justify-center text-sm py-2 text-black">
        <div>
            {lable}
        </div>
        <Link className="pointer underline pl-1" to={to} >{buttonText}
        </Link>
        </div>
    )
}