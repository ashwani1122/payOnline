import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Input from "../components/input";
import UserList from "../components/UserList";
import axios from "axios";

export default function Dashboard(){
    const token = localStorage.getItem('token');
    const [ filter, setFilter] = useState("");
    const [ users, setUsers] = useState([]);
    const [balance, setBalance ] = useState<number>(0);
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/balanceInquiry" ,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        .then((response)=>{
            //@ts-ignore
            setBalance(response.data.balance)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[token])
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then((response)=>{
            //@ts-ignore
            setUsers(response.data.users)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[filter ,token])
    return(
            <div  className=" h-screen overflow-hidden resize-none" >
                <div  style={{backgroundImage: "url('https://cdn.svgator.com/images/2022/06/use-svg-as-background-image-particle-strokes.svg')" }} className=" w-full h-full">
                <div className="w-full flex ">
                <Appbar/>
                </div>
                <div className=" flex mt-10"> 

               {token ? <Balance  balance={ 
                    //@ts-ignore
                    balance?.balance?.toFixed(2)}/>:<></>}
                </div>
                <Input onchange={(e: any)=>{
                    setFilter(e.target.value)
                }}  Label="Users" placeholder="Search for users"/>
                <span className=" flex flex-col justify-center items-center rounded-lg  ">
                <UserList  users={users}/>
                </span>
                </div>
            </div>
    )
}