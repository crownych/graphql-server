import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    created_at: String
});

const PostModel = mongoose.model("posts", PostSchema);
export { PostModel };
