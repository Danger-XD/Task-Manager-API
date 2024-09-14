import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_UN_AUTHORIZED, EMAIL_USER} from "../config/config.js";

const sendEmail = async (EmailTo, EmailText, EmailSubject) => {
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURITY,
        auth:{
            user:EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls:{
            rejectUnauthorized: EMAIL_UN_AUTHORIZED
        }
    })
    let mailOptions = {
        from: 'Task Manager MERN <YOUR_EMAIL_ADDRESS>',
        to:EmailTo,
        subject: EmailSubject,
        text: EmailText
    }
    return await transporter.sendMail(mailOptions);
}
export default sendEmail;