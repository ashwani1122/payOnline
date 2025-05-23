import { Router } from "express";
import { Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import Account from "../dbSchema/accountSchema";
const accountRouter = Router();
accountRouter.get("/balance", userMiddleware, async (req: Request, res: Response) => {
    const account = await Account.findOne({userId: req.user}).select("balance")
    res.json({
        success: true,
        account
    })
})
export default accountRouter