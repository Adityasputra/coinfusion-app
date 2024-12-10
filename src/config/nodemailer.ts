import nodemailer from "nodemailer";

const userEmail = process.env.NODEMAILER_USER as string;
const userPass = process.env.NODEMAILER_PASS as string;

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: userEmail || "keara.hartmann@ethereal.email",
    pass: userPass || "xE4Ggz4W35q8bWVTBj",
  },
});
