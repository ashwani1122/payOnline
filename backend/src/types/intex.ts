import { string } from "zod";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

    declare global {
    namespace Express {
        interface Request {
        user: {
            id : string
        } & string ;
        }
    }
}
export type UserResponse = {
    users: User[];
    success: boolean;
}

export type Account = {
    _id: string;
    userId: string;
    accountNumber: string;
    pin: string;
    balance: number;
}

export type AccountResponse = {
    accounts: Account[];
    success: boolean;
}

export type Balance = {
    balance: number;
}

export type BalanceResponse = {
    balance: number;
    success: boolean;
}