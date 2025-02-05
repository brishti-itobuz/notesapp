import mongoose from "mongoose";
import User from "../models/userSchema.js"

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  fileName: {
    type: String,
}
});

const Note = mongoose.model("note", noteSchema);
export default Note;
