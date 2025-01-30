import User from "../models/userSchema.js";
import { mailSender } from "../emailVerify/mailVerify.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sessionSchema from "../models/sessionSchema";
import dotenv from "dotenv/config";

export const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const identical = await User.findOne({ email: email });

    if (identical) {
      res.status(400).json({
        success: false,
        message: "user already exists",
        data: identical,
      });
    } else {
      const token = jwt.sign({}, process.env.secretKey , { expiresIn: "30m" })
      mailSender(token, email);
      const user_name = await User.create({ username, email, password, token });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user_name.password, salt);
      user_name.password = hashedPassword;
      await user_name.save();

      if (user_name) {
        mailSender(token);
        res.status(200).json({
          success: true,
          message: "user registered successfully",
          data: user_name,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user registration failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user_name = await User.findOne({ email: req.body.email })
    
    
    if (!user_name) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user_name.password
    );


    if(passwordMatch && user_name.isVerified === true ){
      const user_id = await sessionSchema.findOne({ userId: user_name._id })   
      if (!user_id)
      {
      await sessionSchema.create({ userId: user_name._id })
      }
    else {
      return res.status(200).json({
        message: "Session is active for the user",
      })
    }}
    const accessToken = jwt.sign({id: user_name._id}, process.env.secretKey,{ expiresIn: "2m" });
    const refreshToken = jwt.sign({id: user_name._id}, process.env.secretKey,{ expiresIn: "7d" });

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Logged In",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
