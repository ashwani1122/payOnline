
import { Link } from "react-router-dom";
export default function WarningButton({lable , buttonText , to,className,}: {lable: string, buttonText: string, to: string,className: string}){
    return(
        <div  className={className}>
        <div className="text-gray-600 flex flex-row justify-center items-center">
           {lable} <Link className="pointer underline pl-1" to={to} >
              {buttonText}
        </Link>
        </div>
        
        </div>
    )
}