import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
