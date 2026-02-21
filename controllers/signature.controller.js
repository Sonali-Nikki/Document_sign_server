import Signature from "../models/Signature.js";
import { createAuditLog } from "./audit.controller.js";

export const addSignature = async (req, res) => {
  try {
    const { documentId, x, y, page,image,width,height } = req.body;

    const sig = await Signature.create({
      documentId,
      x,
      y,
      page,
      image,
      width,
      height,
      signer: req.user?.id || null,
    });

    await createAuditLog(req, documentId);

    res.status(201).json(sig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSignatures = async (req, res) => {
  try {
    const { docId } = req.params;
    const sigs = await Signature.find({ documentId: docId });
    res.json(sigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSignatureStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;

    const sig = await Signature.findByIdAndUpdate(
      req.params.id,
      { status, reason },
      { new: true },
    );
    await createAuditLog(req, sig.documentId);

    res.json(sig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
