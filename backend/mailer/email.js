import nodemailer from "nodemailer";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import email from "./email";
import process from "process";
import transporter from "./index.d";

// @TODO AUFRUF EINER FUNKTION MIT ÜBERGABE VON Z:B: EMAIL UND NAME IN EINEM MONGOOSE CONTROLLER
const sendPasswordReset = async (email, name, resetCode) => {
  await sendMail({
    recipients: [email],
    mailType: "passwordReset",
    subject: "password Reset",
    vars: {
      username: name,
      userEmail: email,
      resetLink: `${process.env.NEXTAUTH_URL}/auth/password-reset?resetCode=${resetCode}`,
    },
  });
};

const sendWelcome = async (email, name) => {
  await sendMail({
    recipients: [email],
    subject: "Welcome",
    mailType: "welcome",
    vars: {
      username: name,
      userEmail: email,
    },
  });
};
 const sendConfirmation = async (email, name, veryficationCode) => {
   await sendMail({
    recipients: [email],
    subject: "Please Confirm Your Account!",
    mailType: "confirmation",
    vars: {
      username: name,
      userEmail: email,
      virificationLink: `${process.env.NEXTAUTH_URL}/auth/verify?verificationCode=${verificationCode}`,
    },
  });
 };

 const sendGoodBye = async (email, name) => {
  await sendMail({
    recipients: [email],
    subject: "GoodBye",
    mailType: "goodBye",
    vars: {
      username: name,
      userEmail: email,
    },
  });
};

 export default {
   sendPasswordReset,
   sendWelcome,
   sendConfirmation,
   sendGoodBye,
 };
