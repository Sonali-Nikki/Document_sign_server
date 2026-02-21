import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadDocument,getUserDocuments,generatePublicLink,getDocByToken } from "../controllers/document.controller.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadDocument
);
router.get("/", authMiddleware, getUserDocuments);
router.get("/public/:token", getDocByToken);
router.get("/:id/share", authMiddleware, generatePublicLink);

export default router;
