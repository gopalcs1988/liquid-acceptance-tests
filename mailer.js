const nodemailer = require('nodemailer');
const path1 = require("path");
const dotenv = require('dotenv')
const fs = require('fs');
const currentDirectory = __dirname;
const updateFile = path1.join(currentDirectory,"/features/reports/cucumber_report.html");
dotenv.config();

async function mailer() {
  try {
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    //const htmlReportContent = fs.readFileSync(updateFile, 'utf8');
    // Message configuration
    const message = {
      from: process.env.MAIL_USERNAME,
      to: [ process.env.MAIL_USERNAME, "shrihariprakash@gmail.com"],
      subject: 'Test Email from GitHub Actions',
      text: 'This is a test email sent from a GitHub Actions workflow using nodemailer.',
      html: "<b> Test Email </b>",
      //html: htmlReportContent,
      attachments: [
        {
        filename: 'cucumber_report.html',
        path: path1.join(__dirname, "./features/reports/cucumber_report.html")
        },
        {
        filename: 'test.json',
        path: path1.join(__dirname, "./features/reports/test.json")
        }
      ]
      // You can add HTML content as well
      // html: '<p>This is a <b>test</b> email.</p>',
    };

    // Send the email
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }
}

mailer()
