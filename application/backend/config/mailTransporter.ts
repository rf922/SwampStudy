import nodemailer from "nodemailer";

/**
 * transporter used by nodemailer
 */
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // `true` if using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// node mail transport verify
mailTransporter.verify((error, _success) => {
  if (error) {
    console.error("Mail transporter setup error:", error);
  } else {
    console.log("Mail transporter is ready.");
  }
});

export { mailTransporter };
