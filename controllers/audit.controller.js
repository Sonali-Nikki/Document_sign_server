import AuditLog from "../models/AuditLogs.js";

export const createAuditLog = async (req, documentId) => {
  try {
    await AuditLog.create({
      documentId,
      userId: req.user?.id,
      action: req.auditData?.action,
      ip: req.auditData?.ip,
    });
  } catch (error) {
    console.log("Audit log error:", error.message);
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({
      documentId: req.params.fileId,
    }).populate("userId", "name email");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
