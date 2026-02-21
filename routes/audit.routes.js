import express from "express";
import { getAuditLogs } from "../controllers/audit.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:fileId", authMiddleware, getAuditLogs);

export default router;
