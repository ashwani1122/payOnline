import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
const userSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
declare global {
  namespace Express {
    interface Request {
    user: string;
    }
  }
}
const User = mongoose.model<IUser>('User', userSchema);

export default User;  // Correct export
