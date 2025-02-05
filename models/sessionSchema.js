import mongoose from "mongoose";
import User from "../models/userSchema.js";



const sessionSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
  
});
export default mongoose.model("session",sessionSchema)

