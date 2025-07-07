import { Router } from "express";
import { Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import Account from "../dbSchema/accountSchema";
import mongoose from "mongoose";
const transferMoney = Router();
transferMoney.post("/transferMoney", userMiddleware, async (req: Request, res: Response): Promise<void> => {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { amount , to } = req.body
        const account = await Account.findOne({userId: req.user.id})
        if(!account || account.balance < amount){
            session.abortTransaction();
            res.status(400).json({
                success: false,
                message: "Insufficient balance"
            })
        return
        }
        const toAccount = await Account.findOne({userId: to}).session(session)
        if(!toAccount){
            await session.abortTransaction();
        res.status(400).json({
        success: false,
        message: "To account not found"
            })
            return
        }
        await Account.updateOne({userId: req.user.id},{$inc: {balance: -amount}}).session(session)
        await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session)
        await session.commitTransaction();
        res.status(200).json({
            success: true,
            message: "Transfer successful"
        })
    })
export default transferMoney