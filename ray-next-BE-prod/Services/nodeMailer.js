const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can change this to your email service provider
  auth: {
    user: 'aju4613@gmail.com',
    pass: 'nkcwftgixossiict'
  }
});

module.exports = transporter;