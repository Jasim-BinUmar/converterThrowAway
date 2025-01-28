/////////////////////////////////////////////////Using ghost script//////////////////////////////////////////////
const { exec } = require('child_process');

const inputPdf = 'Research.pdf';
const outputPdf = 'output_pdfa.pdf';

const command = `gs -dPDFA=1 -dBATCH -dNOPAUSE -dNOOUTERSAVE -sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sPDFACompatibilityPolicy=1 -sOutputFile=${outputPdf} ${inputPdf}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error converting to PDF/A: ${stderr}`);
  } else {
    console.log(`PDF/A file saved as ${outputPdf}`);
  }
});


  ///////////////////////////////////////////////using PDFTron////////////////////////////////////////////////////////
//   const PDFNet = require('@pdftron/pdfnet-node');

//   async function convertToPdfA(inputPdfPath, outputPdfPath) {
//     try {
//       // Initialize PDFTron
//       await PDFNet.initialize();
  
//       // Create a PDF document object from input file
//       const doc = await PDFNet.PDFDoc.createFromFilePath(inputPdfPath);
  
//       // Convert the document to PDF/A-1b
//       await doc.convertToPDFA(1); // 1 is for PDF/A-1b
  
//       // Save the converted PDF/A to the output path
//       await doc.save(outputPdfPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  
//       console.log(`PDF/A file saved at ${outputPdfPath}`);
//     } catch (error) {
//       console.error('Error converting to PDF/A:', error);
//     }
//   }
  
//   // Example usage
//   const inputPdf = 'input.pdf';  // Path to your input PDF
//   const outputPdf = 'output_pdfa.pdf';  // Path where the PDF/A will be saved
  
//   convertToPdfA(inputPdf, outputPdf)
//     .then(() => console.log('Conversion complete!'))
//     .catch(console.error);
  