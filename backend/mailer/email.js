import process from "process";
import sendMail from "./lib.js";
import {v4} from "uuid";


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

const sendWelcome = async (req, res, next) => {
  const email = req.body.email;

  await sendMail({
    recipients: [email],
    subject: "Welcome",
    mailType: "welcome",
    vars: {
      username: req.body.username,
      userEmail: email,
    },
  });
  next();
};

const sendConfirmation = async (req, res, next) => {
  const email = req.body.email;

  await sendMail({
    recipients: [email],
    subject: "Please Confirm Your Account!",
    mailType: "confirmation",
    vars: {
      username: req.body.username,
      userEmail: email,
      verificationLink: `${process.env.NEXTAUTH_URL}/api/user/emailVerification/${res.emailVerificationCode}`,
    },
  });
  next();
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

// register: async (parent, args, { transporter, models, EMAIL_SECRET }) => {
//   const hashedPasswort = await bcrypt.hash(args.password, 12);
//   const user = await models.User.create({
//     ...args,
//     password: hashedPassword,
//   });

//   try {
//     const emailToken = jwt.sign(
//       {
//         user: _.pick(user, 'id'),
//       },
//       EMAIL_SECRET,
//       {
//         expiresIn: '1d',
//       },
//     );

//     const url = `...${emailToken}`;

//     await transporter.sendMail({
//       to: args.email,
//       subject: 'Confirm Email',
//       html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
//     });
//   } catch (e) {
//     console.log(e);
//   }

//   return user;
// };

/*
  Calculate crc32 of something.
*/
// let crc32 = (function() {
//   let c, crcTable = []; // generate crc table
  
//   for (let n = 0; n < 256; n++) {
//     c = n;
    
//     for (let k = 0; k < 8; k++) {
//       c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
//     }
    
//     crcTable[n] = c;
//   }
  
//   return function(str) {
//     let crc = 0 ^ (-1); // calculate actual crc
    
//     for (let i = 0; i < str.length; i++) {
//       crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
//     }
    
//     return (crc ^ (-1)) >>> 0;
//   }
// })();


// function uuid() {
//   let d = (Date.now !== undefined && typeof Date.now === "function") ? Date.now() : new Date().getTime();
  
//   if (window.performance && typeof window.performance.now === "function")
//     d += performance.now();
  
//   let uuid = "xxxxxxxx-xxxx-4xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
//     let r = (d + Math.random() * 16) % 16 | 0;
//     d = Math.floor(d / 16);
//     return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
//   });
  
//   return uuid;
// }


// function qs(s) {
//   return document.querySelector(s);
// }

// let expirationTimeInMilliseconds = 30 * 1000;

// let verification = qs(".verification"),
//     verificationCode = qs(".verification .code");

// const crcPattern = "00000000";

// function showNewVerificationCode() {
//   let nextCode = uuid().toUpperCase();
//   nextCode = crcPattern.split(0, crcPattern.length - nextCode.length) + nextCode;
  
//   verification.classList.remove("running");
//   verificationCode.innerHTML = nextCode;
//   verification.offsetWidth = verification.offsetWidth;
//   verification.classList.add("running");
  
//   setTimeout(showNewVerificationCode, expirationTimeInMilliseconds);
// }

// showNewVerificationCode();


export default {
  sendPasswordReset,
  sendWelcome,
  sendConfirmation,
  sendGoodBye,
};
