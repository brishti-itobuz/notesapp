import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const mailSender = async (token) => {
  console.log(token);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.authUser,
      pass: process.env.authPass,
    },
  });

  const mailConfigurations = {
    from: "brishti@itobuz.com",

    to: "brishti@itobuz.com",

    subject: "Email Verification",

    text: `Hi! There, You have recently entered your email.
             Please follow the given link to verify your email
             http://localhost:3001/user/verify/${token} 
             Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
