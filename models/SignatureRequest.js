import mongoose from "mongoose";

const signatureRequestSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },
  email: String,
  token: String,
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("SignatureRequest", signatureRequestSchema);
