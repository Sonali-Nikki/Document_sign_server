import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addSignature,
  getSignatures,
  updateSignatureStatus,
} from "../controllers/signature.controller.js";
import auditMiddleware from "../middleware/auditMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addSignature);
router.get("/:docId", authMiddleware, getSignatures);
router.put(
  "/:id",
  authMiddleware,
  auditMiddleware("UPDATED_SIGNATURE_STATUS"),
  updateSignatureStatus
);
router.post(
  "/",
  authMiddleware,
  auditMiddleware("SIGNED_DOCUMENT"),
  addSignature,
);

export default router;
