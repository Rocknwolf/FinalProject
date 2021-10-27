import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'finalprojectmoviedatabase@gmail.com',
    pass: 'AlexFriederSven2021'
  }
});

let mailOptions = {
  from: 'finalprojectmoviedatabase@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  html: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

export default {};