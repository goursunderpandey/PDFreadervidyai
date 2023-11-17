const mongoose = require('mongoose');

// Schema for uploaded PDFs
const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: 'PdfDetails' }
);

const UploadedPdf = mongoose.model('PdfDetails', PdfDetailsSchema);

// Schema for extracted PDFs
const ExtractedPdfSchema = new mongoose.Schema(
  {
    uploadedPdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PdfDetails',
      required: true,
    },
    extractedPdf: String, 
    pageNumber: [Number],
  },
  { collection: 'ExtractedPdfs' } 
);

const ExtractedPdf = mongoose.model('ExtractedPdf', ExtractedPdfSchema);

module.exports = { UploadedPdf, ExtractedPdf };
