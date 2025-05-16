import dotenv from "dotenv";
dotenv.config();
import { Router } from "express"
import { Request, Response } from "express"
import  zod from  "zod"
import jwt from "jsonwebtoken"
import User from "../dbSchema/userSchema"
import Account from "../dbSchema/accountSchema"

const userRouter = Router();
userRouter.post("/signup" ,async (req: Request, res: Response) : Promise<void> => { 

    const body = req.body
    const user = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const userData = user.safeParse(body)
    if(userData.success){ 
        
        const newUser = new User(userData.data)
        await newUser.save()
        res.status(201).json({
            Message: "User created successfully",
            success: true
        })
    }
    else{
        res.status(400).json({
            Message: "Invalid data",
            success: false
        })
    }
})
userRouter.post("/signin", async (req: Request, res: Response) => {
    const body = req.body;
    const usersignin = zod.object({
        email : zod.string(),
        password: zod.string().min(8)
    }) 
    const { success } = usersignin.safeParse(body);
    try {
        if(success){
        
        const user = await User.findOne({email: body.email})
        const userId = user?._id
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
        if(!process.env.JWT_SECRET){
            res.status(400).json({
                success: false,
                message: "JWT_SECRET is not set"
            })
        }
        else if(user){
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        } 
    }
    }
    catch (error) {
        console.log(error)
    }
})

export default userRouter