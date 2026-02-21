import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: String,
  filePath: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "signed", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);