import nodemailer from "nodemailer";
import dotenv from "dotenv/config";
import hbs from "nodemailer-express-handlebars";

export const mailSender = async (token) => {
  console.log(token);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.authUser,
      pass: process.env.authPass,
    },
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: "template",
      defaultLayout: false,
      layoutsDir: "template",
    },
    viewPath: "template",
    extName: ".hbs",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailConfigurations = {
    from: "brishti@itobuz.com",

    to: "brishti@itobuz.com",

    subject: "Email Verification",

    template: "email",

    context: {
      token: `${token}`,
    },
  };

  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) throw new Error(error);
    else {
      console.log("Email Sent Successfully");
      console.log(info);
    }
  });
};
