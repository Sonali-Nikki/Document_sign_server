import express from "express";
import { generateSignedPDF } from "../controllers/pdf.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sign/:docId", authMiddleware, generateSignedPDF);

export default router;
