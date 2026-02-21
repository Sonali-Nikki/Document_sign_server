import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  action: String,
  ip: String,
}, { timestamps: true });

export default mongoose.model("AuditLog", auditLogSchema);
