import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Document from "../models/Document.js";
import Signature from "../models/Signature.js";

export const generateSignedPDF = async (req, res) => {
  try {
    const { docId } = req.params;

    const doc = await Document.findById(docId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const signatures = await Signature.find({ documentId: docId });

    // ✅ Load PDF
    const pdfPath = path.resolve(doc.filePath);
    const existingPdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ✅ Loop signatures
   for (const sig of signatures) {
  const pageIndex = sig.page ? sig.page - 1 : 0;
  const page = pages[pageIndex];

  if (sig.image) {
    const base64Data = sig.image.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    const pngImage = await pdfDoc.embedPng(imageBuffer);

    const imgDims = pngImage.scale(1);

    const width = sig.width || imgDims.width * 0.3;
    const height =
      sig.height || (width * imgDims.height) / imgDims.width;

    page.drawImage(pngImage, {
      x: sig.x,
      y: page.getHeight() - sig.y - height,
      width,
      height,
    });
  }
}


    const pdfBytes = await pdfDoc.save();

    const outputPath = `uploads/signed-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, pdfBytes);

    return res.download(outputPath);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
