import mongoose, { Schema } from "mongoose";
import { Comment } from "./comment.interface";

const commentSchema = new Schema({
  author: String,
  content: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const commentModel = mongoose.model<Comment & mongoose.Document>("Comment", commentSchema);

export default commentModel;
