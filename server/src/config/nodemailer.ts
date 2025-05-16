import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const userEmail = process.env.NODEMAILER_USER as string;
export const userPass = process.env.NODEMAILER_PASS as string;

if (!userEmail || !userPass) {
  throw new Error(
    "Nodemailer configuration failed. Please set NODEMAILER_USER and NODEMAILER_PASS in the environment variables."
  );
}

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: userEmail,
    pass: userPass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer is not configured properly:", error);
  } else {
    console.log("✅ Nodemailer is configured and ready to send emails");
  }
});
