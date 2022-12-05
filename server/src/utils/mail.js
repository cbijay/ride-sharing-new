const { createTransport } = require("nodemailer");
const { config } = require("../config");

const transporter = createTransport({
  service: config.mail.service,
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});

exports.sendMail = (from, to, subject, text, html) => {
  const mailData = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailData, function (error, info) {
    if (error) return error.message;

    return info.response;
  });
};
