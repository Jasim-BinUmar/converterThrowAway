const fs = require('fs');
const pdf = require('pdf-parse');
const docx = require('docx');
const { Document, Paragraph, TextRun } = docx;

// Read the PDF file
const dataBuffer = fs.readFileSync('Research.pdf');

pdf(dataBuffer).then(function(data) {
    // Create a new document
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun(data.text)
                    ],
                }),
            ],
        }],
    });

    // Used to export the file into a .docx file
    docx.Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("output.docx", buffer);
    });
}).catch(function(error){
    console.error(error);
});


//////////////////////////////////////////////Using pdf-officegen///////////////////////////////////////////////////////////



// const { Word } = require('pdf-officegen');
// const path = require('path');
// const fs = require('fs');

// // Define the input and output file paths
// const inputPath = path.join(process.cwd(), 'input.pdf');
// const outputPath = path.join(process.cwd(), 'output.docx');

// // Create a new Word instance
// const word = new Word();

// // Define options (if needed)
// const options = {
//   // Add any specific options here
// };

// // Convert PDF to Word
// word.convertFromPdf([inputPath], options, (err, result) => {
//   if (err) {
//     console.error('Error during conversion:', err);
//     return;
//   }

//   // Save the result to a file
//   fs.writeFile(outputPath, result, (writeErr) => {
//     if (writeErr) {
//       console.error('Error writing the Word file:', writeErr);
//     } else {
//       console.log('Word document saved at:', outputPath);
//     }
//   });
// });

// // Log the start of the conversion process
// console.log('Starting PDF to Word conversion...');