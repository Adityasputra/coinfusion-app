import nodemailer from "nodemailer";

const userEmail = process.env.NODEMAILER_USER;
const userPass = process.env.NODEMAILER_PASS;

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
    user: "vaughn43@ethereal.email",
    pass: "AXMKYeRPaNGuhNatEb",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Failed to configure Nodemailer:", error);
  } else {
    console.log("Nodemailer is configured and ready to send emails");
  }
});
