const nodemailer = require("nodemailer");
const path1 = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const util = require("util");
const currentDirectory = __dirname;
const updateFile = path1.join(currentDirectory,"/features/reports/index.html");
const {extractValuesFromHTML} = require("./htmlContentReader.js");
dotenv.config();

async function mailer() {
  try {
    const readFile = util.promisify(fs.readFile);
    // Read HTML file and extract values
    const htmlContent = await readFile(updateFile, "utf8");
    const extractedValues = extractValuesFromHTML(htmlContent);
    const templateFile = path1.join(__dirname, "./template.html");
    const template = await fs.promises.readFile(templateFile, "utf8");
    const html = template
      .replaceAll("%extractedValues.allScenarios%", extractedValues.allScenarios)
      .replaceAll("%extractedValues.passedScenarios%", extractedValues.passedScenarios)
      .replaceAll("%extractedValues.failedScenarios%", extractedValues.failedScenarios)
    
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
      html,
      attachments: [
        {
          filename: "index.html",
          path: path1.join(
            __dirname,
            "./features/reports/index.html"
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
