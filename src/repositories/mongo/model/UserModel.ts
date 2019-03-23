import mongoose from "mongoose";

// Subdocuments 作法，請參考： https://mongoosejs.com/docs/subdocs.html
//import { PostSchema } from "./PostModel";

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    created_at: String
});

const UserModel = mongoose.model("users", UserSchema);
export { UserModel };
