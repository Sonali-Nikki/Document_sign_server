import crypto from "crypto";
import SignatureRequest from "../models/SignatureRequest.js";
import nodemailer from "nodemailer";

export const createSignRequest = async (req, res) => {
  try {
    const { documentId, email } = req.body;

    const token = crypto.randomBytes(20).toString("hex");

    const request = await SignatureRequest.create({
      documentId,
      email,
      token,
    });

    // EMAIL (mock or real)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password",
      },
    });

    const link = `http://localhost:5173/sign/${token}`;

    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Sign Document",
      html: `<p>Click below to sign:</p><a href="${link}">${link}</a>`,
    });

    res.json({ message: "Email sent", link });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
