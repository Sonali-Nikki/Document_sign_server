import Document from "../models/Document.js";
import { v4 as uuidv4 } from "uuid";

export const uploadDocument = async (req, res) => {
  try {
    console.log("FILE ", req.file);
    console.log("USER ", req.user);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.user) {
      return res.status(400).json({ message: "User not found in request" });
    }

    const doc = await Document.create({
      title: req.file.originalname,
      filePath: req.file.path,
      user: req.user.id, 
      status: "pending",
    });

    console.log("DOC CREATED ", doc);

    res.status(201).json(doc);
  } catch (err) {
    console.error(" FULL ERROR ", err);
    res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};

export const getUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generatePublicLink = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    if (doc.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    if (!doc.publicToken) {
      doc.publicToken = uuidv4();
      await doc.save();
    }

    const link = `http://localhost:5173/sign/${doc.publicToken}`;

    res.json({ link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDocByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const doc = await Document.findOne({ publicToken: token });

    if (!doc) {
      return res.status(404).json({ msg: "Invalid link" });
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
