import mongoose from "mongoose";



const sessionSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
  
});
export default mongoose.model("session",sessionSchema)

