import { createTransport } from "nodemailer";
import { config } from "../config";

const transporter = createTransport({
  port: 465,
  host: config.mail.host,
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
  secure: true,
});

export const sendMail = (to, subject, body, html) => {
  const mailData = {
    from: config.mail.user, // sender address
    to: to, // list of receivers
    subject: subject,
    body: body,
    html: html,
  };

  transporter.sendMail(mailData, function (error, info) {
    if (error) return error.message;

    return info.response;
  });
};
