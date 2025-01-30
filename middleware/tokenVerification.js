import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv/config";

export const verifyToken = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  jwt.verify(token, process.env.secretKey , async function (err, decoded) {
    if (err) {
      console.log(err);
      res.send("Email verification failed");
    } else {
      await User.findOneAndUpdate(
        { token: token },
        { $set: { isVerified: true, token: null } },
        { new: true }
      );
      res.send("Email verified successfully");
    }
  });
};
