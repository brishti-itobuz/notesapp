
import User from '../models/userSchema.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';


export const addUser = async (req, res) => {

  try {
    const token = jwt.sign({
    }, 'ourSecretKey', { expiresIn: '20m' }
    );
    const { username, email, password } = req.body;
    const user_name = await User.create({ username, email, password, token, isVerified});
    const identical = await User.findOne({email:email});
    if(identical){
      res.status(400).json({
        success: false,
        message: "user already exists",
        data: identical,
      })
    

    }
    
    if (user_name) {
      mailSender(token);
      res.status(200).json({
        success: true,
        message: "user registered successfully",
        data: user_name,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user registration failed",
    })
  }
}

const mailSender = async(token) => {
  console.log(token);
  
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'brishti@itobuz.com',
          pass: 'orha kilc tygo hhgs',
      }
  });
      
  
  const mailConfigurations = {
  
  
      from: 'brishti@itobuz.com',
  
      to: 'brishti@itobuz.com',
  
      
      subject: 'Email Verification',
      
  
      text: `Hi! There, You have recently entered your email.
             Please follow the given link to verify your email
             http://localhost:3001/user/verify/${token} 
             Thanks`
  };
  
    transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
      console.log('Email Sent Successfully');
      console.log(info);
  });
  
}








