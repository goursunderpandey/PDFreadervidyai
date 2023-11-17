const { PDFDocument } = require('pdf-lib');
const fs = require('fs/promises');
const { readFileSync, writeFileSync } = require('fs');

const createPdf = async (sourcePath, outputPath, pageRange) => {
  try {
    const sourceBytes = await fs.readFile(sourcePath);
    const pdfDoc = await PDFDocument.create();

    const sourceDoc = await PDFDocument.load(readFileSync(sourcePath));
    const importedPage = await pdfDoc.copyPages(sourceDoc, pageRange);


    for (let pageNumber of importedPage) {
      
       pdfDoc.addPage(pageNumber);
      // page.drawPage(importedPage);
    }

     writeFileSync(outputPath,await pdfDoc.save());
    console.log(`New PDF created at ${outputPath}`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports= {createPdf}