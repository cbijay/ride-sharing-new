var nodemailer = require("nodemailer");
const { config } = require("../config");

var transporter = nodemailer.createTransport({
  service: "mailtrap",
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});
var mailOptions = {
  from: "bijay.res@gmail.com",
  to: "kasov89718@ceoshub.com",
  subject: "Testmail",
  text: "Test",
  html: "Hi, mail sent.",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
