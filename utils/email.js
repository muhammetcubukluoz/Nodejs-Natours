const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1- Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: proccess.env.EMAIL_PORT,
    auth: {
      user: proccess.env.EMAIL_USERNAME,
      pass: proccess.env.EMAIL_PASSWORD,
    },
    // Avtivate in gmail "less secure app" option
  });

  //2- Define the email options
  const mailOptions = {
    from: 'Muhammet Çubukluöz <muhammedcubukluoz@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };

  //3- actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
