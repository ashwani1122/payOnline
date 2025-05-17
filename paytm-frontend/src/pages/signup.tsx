import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/input";
import { useNavigate } from "react-router-dom";
import SubHeading from "../components/Subheading";
import axios from "axios";
import WarningButton from "../components/WarningButton";
export  default function signup(){
    const navigate = useNavigate();
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    return(
        <div style={{backgroundImage: "url('https://cdn.svgator.com/images/2022/06/use-svg-as-background-image-particle-strokes.svg')"}}>
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="border shadow-lg rounded-md px-2 bg-white-700">
                <Heading Label="Signup"/>
                <SubHeading Label="Enter your information to create an account"/>
                <Input onchange={(e: any)=>setFirstName(e.target.value)} Label="First Name" placeholder="Enter your first name"/>
                <Input onchange={(e: any)=>setLastName(e.target.value)} Label="Last Name" placeholder="Enter your last name"/>
                <Input onchange={(e: any)=>setEmail(e.target.value)} Label="Email" placeholder="Enter your email"/>
                <Input onchange={(e: any)=>setPassword(e.target.value)} Label="Password" placeholder="Enter your password"/>
                <Button label="signup" onClick={()=>{
                    axios.post("https://payonline.onrender.com/api/v1/user/signup",{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                    navigate("/signin")
                }} />
                <WarningButton lable={"Already have an account?"} buttonText={"Signin"} to ={"/signin"}/>
               
                
            </div>
        </div>
        </div>
    )
}