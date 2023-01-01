const nodemailer = require("nodemailer");

const API_URL =
  process.env.NODE_ENV === "test"
    ? process.env.LOCAL_API_URL
    : process.env.LOCAL_API_URL;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `NodeAuth. Account activation link for ${API_URL}`,
      text: "",
      html: `
        <div>
          <h1>Follow the link to activate your account</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
