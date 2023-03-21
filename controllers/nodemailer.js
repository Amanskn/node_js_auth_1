import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();



console.log("Inside nodemailer",process.env.USER_EMAIL)
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASS, // generated ethereal password
    },
  });

 export default transporter;