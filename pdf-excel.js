const pdf2excel = require('pdf-to-excel');
const path = require('path');

// Define input and output file paths
const inputPath = path.join(process.cwd(), 'xlsToPdf.pdf');
const outputPath = path.join(process.cwd(), 'ptoX.xlsx');

async function convertPdfToExcel() {
    try {
        const options = {
            // Progress callback - logs current page being processed
            onProcess: (e) => console.log(`Converting page ${e.numPage} of ${e.numPages}`),
            // Start from first page
            start: 1,
            // Convert all pages (undefined means convert all pages)
            end: undefined,
        };

        console.log('Starting PDF to Excel conversion...');
        console.log('Input file:', inputPath);
        console.log('Output file:', outputPath);

        // Convert PDF to Excel
        await pdf2excel.genXlsx(inputPath, outputPath, options);
        
        console.log('Conversion completed successfully!');
        console.log('Excel file saved at:', outputPath);
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}

// Run the conversion
convertPdfToExcel();

/////////////////////////////////////////////////////////////////////////////////////
// const fs = require ('fs/promises');
// const pdf = require ('pdf-parse');
// const xlsx = require ('xlsx');

// async function convertPdfToExcel(pdfPath, excelPath) {
//   try {
//     // Read the PDF file
//     console.log('Reading PDF file...');
//     const dataBuffer = await fs.readFile(pdfPath);

//     // Parse the PDF content
//     console.log('Parsing PDF content...');
//     const data = await pdf(dataBuffer);

//     // Extract text content
//     const text = data.text;
//     console.log('Extracted text from PDF:');
//     console.log(text.slice(0, 200) + '...'); // Display first 200 characters

//     // Create a worksheet
//     const ws = xlsx.utils.aoa_to_sheet([['PDF Content'], [text]]);

//     // Create a workbook and append the worksheet
//     const wb = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, ws, 'PDF Text');

//     // Write to Excel file
//     console.log('Writing to Excel file...');
//     xlsx.writeFile(wb, excelPath);

//     console.log(`Excel file created successfully at ${excelPath}`);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// // Example usage
// const pdfPath = './xlsToPdf.pdf';
// const excelPath = './pdfToXls.xlsx';

// convertPdfToExcel(pdfPath, excelPath);