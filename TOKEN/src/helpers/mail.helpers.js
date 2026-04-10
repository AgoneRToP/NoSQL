import transporter from "../configs/mail.config.js";

const sendEmail = (to, subject, content) => {
  transporter.sendMail(
    {
      to,
      subject,
      text: content,
      // html: content,
    },
    (err, info) => {
      if (err) {
        throw new Error("Mail yuborishda xatolik");
      }
    },
  );
};

export default sendEmail
