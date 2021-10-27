const sgMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");
// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "hemantmodi@gmail.com",
//     pass: "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",
//   },
//   port: 587,
//   host: "smtp.sendgrid.net",
// });
sgMail.setApiKey(
  "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"
);
async function sendEmail(to, subject, data) {
  console.log(to);
  const msg = {
    to: to,
    from: "hemantmodi409@gmail.com",
    subject: subject,
    data: data,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.log(err);
  }

  // try {
  //   transport.sendMail({
  //     to: to,
  //     from: from,
  //     subject: subject,
  //     html: data,
  //   });
  //   return "sent successfull";
  // } catch (err) {
  //   throw err;
  // }
}
exports.sendEmail = sendEmail;
