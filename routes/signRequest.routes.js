import express from "express";
import { createSignRequest } from "../controllers/signRequest.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSignRequest);

export default router;
