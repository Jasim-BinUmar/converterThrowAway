import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

// Function to create a sample PDF
async function createSamplePDF(filename, pages) {
  const pdfDoc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) {
    pdfDoc.addPage([500, 700]);
  }
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(filename, pdfBytes);
  console.log(`Created sample PDF: ${filename} with ${pages} pages`);
}

// Function to merge PDFs
async function mergePDFs(inputFiles, outputFile) {
  const mergedPdf = await PDFDocument.create();
  for (const file of inputFiles) {
    const pdfBytes = await fs.readFile(file);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const pdfBytes = await mergedPdf.save();
  await fs.writeFile(outputFile, pdfBytes);
  console.log(`Merged PDF saved as ${outputFile}`);
}

// Function to split PDF
async function splitPDF(inputFile, ranges, outputDir) {
  const pdfBytes = await fs.readFile(inputFile);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();

  for (const [index, range] of ranges.entries()) {
    const [start, end] = range.split('-').map(Number);
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => i + start - 1));
    pages.forEach(page => newPdf.addPage(page));
    const newPdfBytes = await newPdf.save();
    const outputPath = path.join(outputDir, `split_${index + 1}.pdf`);
    await fs.writeFile(outputPath, newPdfBytes);
  }
  console.log(`Split PDF saved in ${outputDir}`);
}

// Function to remove pages
async function removePages(inputFile, pagesToRemove, outputFile) {
  const pdfBytes = await fs.readFile(inputFile);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();
  const removeSet = new Set(pagesToRemove);
  const newPdf = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) {
    if (!removeSet.has(i + 1)) {
      const [page] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(page);
    }
  }
  const newPdfBytes = await newPdf.save();
  await fs.writeFile(outputFile, newPdfBytes);
  console.log(`PDF with removed pages saved as ${outputFile}`);
}

// Function to extract pages
async function extractPages(inputFile, pagesToExtract, outputFile) {
  const pdfBytes = await fs.readFile(inputFile);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdfDoc, pagesToExtract.map(p => p - 1));
  pages.forEach(page => newPdf.addPage(page));
  const newPdfBytes = await newPdf.save();
  await fs.writeFile(outputFile, newPdfBytes);
  console.log(`Extracted pages saved as ${outputFile}`);
}

// Main function to organize PDF
async function organizePDF(inputFile, operations) {
  for (const op of operations) {
    switch (op.type) {
      case 'merge':
        await mergePDFs(op.files, op.output);
        break;
      case 'split':
        await splitPDF(inputFile, op.ranges, op.outputDir);
        break;
      case 'remove':
        await removePages(inputFile, op.pages, op.output);
        break;
      case 'extract':
        await extractPages(inputFile, op.pages, op.output);
        break;
      default:
        console.log(`Unknown operation: ${op.type}`);
    }
  }
}

// Create sample PDFs and run the organizer
(async () => {
  try {
    // await fs.mkdir('./output', { recursive: true });
    // await createSamplePDF('./output/input.pdf', 5);
    // await createSamplePDF('./output/input1.pdf', 3);
    // await createSamplePDF('./output/input2.pdf', 2);
    
    await organizePDF('./output/lecture29_merged.pdf', [
      { type: 'merge', files: ['./output/input1.pdf', './output/input2.pdf'], output: './output/merged.pdf' },
      { type: 'split', ranges: ['1-2', '3-4'], outputDir: './output' },
      { type: 'remove', pages: [2, 4], output: './output/removed_pages.pdf' },
      { type: 'extract', pages: [1, 3, 5], output: './output/extracted_pages.pdf' }
    ]);
    console.log('PDF organization completed successfully');
  } catch (error) {
    console.error('Error organizing PDF:', error);
  }
})();