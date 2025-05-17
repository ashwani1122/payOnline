import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input";
import SubHeading from "../components/Subheading";
import WarningButton from "../components/WarningButton";
import axios from "axios";
export  default function Signin(){
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div   style={{backgroundImage: "url('https://cdn.svgator.com/images/2022/06/use-svg-as-background-image-particle-strokes.svg')"}}>
        <div className="flex flex-col items-center justify-center h-screen ">
            <div  className="border shadow-lg  rounded-md px-2">
                <Heading Label="Sign In"/>
                <SubHeading Label="Enter your information to create an account"/>
                <Input onchange={(e: any)=>setEmail(e.target.value)} Label="Email" placeholder="Enter your email"/>
                <Input  onchange={(e: any)=>setPassword(e.target.value)} Label="Password" placeholder="Enter your password"/>
                <Button label="Sign In" onClick={async ()=>{
                    const response  = await axios.post("http://localhost:3000/api/v1/user/signin" ,{
                        email: email,
                        password: password
                    });
                    //@ts-ignore
                    console.log(response.data.token);
                    //@ts-ignore
                    localStorage.setItem("token", response.data.token);
                    navigate("/")
                }}  />
                
                <WarningButton lable={"Already have an account?"} buttonText={"Signup"} to ={"/"}/>
            </div>
            
        </div>
        </div>
    )
}

