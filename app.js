require("dotenv").config();
const fs = require("fs");
const nodeMailer = require("nodemailer");

const html = fs.readFileSync("./index.html", "utf8");

async function mailFn() {
  const transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: `Outfitted <${process.env.MAIL_USER}>`,
    to: "manwith619@gmail.com",
    subject: "Outfitted Newsletter",
    html: html
  });

  console.log("Message ID:", info.messageId);
  console.log("Rejected:", info.rejected);
}

mailFn().catch(console.error);
