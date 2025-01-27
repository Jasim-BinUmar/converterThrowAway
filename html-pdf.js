var html_to_pdf = require('html-pdf-node');
const fs = require('fs'); // Import the file system module

// PDF generation options
let options = { format: 'A4' };

// Input source for the PDF
let file = { url: "https://www.npmjs.com/package/converithtmldocx2?activeTab=readme" };

// Generate the PDF and save it to a file
html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
  // Save the PDF to the filesystem
  fs.writeFileSync('output.pdf', pdfBuffer);

  console.log("PDF saved as output.pdf");
});
