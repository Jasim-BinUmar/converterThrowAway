const pdf2excel = require('pdf-to-excel');
const path = require('path');

// Define input and output file paths
const inputPath = path.join(process.cwd(), 'FinancialSample.pdf');
const outputPath = path.join(process.cwd(), 'output.xlsx');

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