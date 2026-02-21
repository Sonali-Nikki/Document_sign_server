import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    x: Number,
    y: Number,
    page: Number,
    image: String,
    width: Number,
    height: Number,
    signer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "signed", "rejected"],
      default: "pending",
    },
    reason: String,
  },
  { timestamps: true },
);

export default mongoose.model("Signature", signatureSchema);
