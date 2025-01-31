import jwt from "jsonwebtoken";
import sessionSchema from "../models/sessionSchema.js";
import userSchema from "../models/userSchema.js";
import dotenv from "dotenv/config";

export const verifyAccessToken =  async (req, res, next) => {
  try {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }
else {
    const accessToken = authHeader.split(" ")[1];
    
    jwt.verify(accessToken, process.env.secretKey, async (err, decoded) => {
      if(err){
          return res.status(400).json({
            success: false,
            message: "Access token expired",
         });
      }
      else{
         const id = decoded.id;
         
         req.body.userId  =  id;
         const user = await userSchema.findById(id);
         
         const user_id = await sessionSchema.findOne({ userId: id });
         
         
          if (!user || !user_id) {
            return res.status(403).json({
              success: false,
              message: "user not found or user logged out",
              accessToken
            });
          }

          next();
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


