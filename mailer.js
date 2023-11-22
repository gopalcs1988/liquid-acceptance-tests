const nodemailer = require("nodemailer");
const path1 = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const util = require("util");
const currentDirectory = __dirname;
const updateFile = path1.join(currentDirectory,"/features/reports/cucumber_report.html");
const {extractValuesFromHTML} = require("./htmlContentReader.js");
dotenv.config();

async function mailer() {
  try {
    const readFile = util.promisify(fs.readFile);
    // Read HTML file and extract values
    const htmlContent = await readFile(updateFile, "utf8");
    const extractedValues = extractValuesFromHTML(htmlContent);
    const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
            }

            h1 {
                color: #333;
            }

            p {
                color: #555;
            }

            ul {
                list-style-type: none;
                padding: 0;
            }

            li {
                margin-bottom: 10px;
            }

            li strong {
                color: #007BFF;
            }
        </style>
        <title>Liquid Test Report</title>
    </head>
    <body>
        <h1>Liquid Test Report</h1>
        <p>Summary of Scenarios:</p>
        
        <ul>
            <li>All Scenarios: <strong>${extractedValues.allScenarios}</strong></li>
            <li>Passed Scenarios: <strong>${extractedValues.passedScenarios}</strong></li>
            <li>Failed Scenarios: <strong>${extractedValues.failedScenarios}</strong></li>
        </ul>

        <p>Thank you!</p>
    </body>
    </html>
`;
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Message configuration
    const message = {
      from: process.env.MAIL_USERNAME,
      to: [process.env.MAIL_USERNAME, "shrihariprakash@gmail.com"],
      subject: "Liquid Acceptance Test Report",
      text: "This is a test email sent from a GitHub Actions workflow using nodemailer.",
      //html: "<b> Test Email </b>",
      html: emailBody,
      attachments: [
        {
          filename: "cucumber_report.html",
          path: path1.join(
            __dirname,
            "./features/reports/cucumber_report.html"
          ),
        },
        {
          filename: "test.json",
          path: path1.join(__dirname, "./features/reports/test.json"),
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(message);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    process.exit(1);
  }
}

mailer();
