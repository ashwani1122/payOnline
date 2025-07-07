import { Router } from "express";
import { Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import Account from "../dbSchema/accountSchema";
import { User } from "../types/intex";
const balanceInquiry = Router();

balanceInquiry.get("/balanceInquiry", userMiddleware, async (req: Request, res: Response) => {
    
    const account = await Account.findOne({userId: req.user.id});
    res.json({
        success: true,
        balance: account
    }) 
})
export default balanceInquiry