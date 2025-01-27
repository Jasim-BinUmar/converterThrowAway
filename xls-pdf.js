const XlsxPopulate = require('xlsx-populate');
const puppeteer = require('puppeteer');
const path = require('path');

async function convertExcelToPdf(inputPath, outputPath) {
  try {
    console.log('Starting conversion...');
    console.log('Input Excel:', inputPath);
    console.log('Output PDF:', outputPath);

    // Load the workbook
    const workbook = await XlsxPopulate.fromFileAsync(inputPath);

    // Get the first sheet
    const sheet = workbook.sheet(0);

    // Get all the rows and columns in the used range
    const rows = sheet.usedRange().value();
    const maxColumnsPerPage = 4; // Limit to 4 columns at a time

    // Split rows into groups of 4 columns
    const columnChunks = [];
    const totalColumns = Math.max(...rows.map(row => row.length)); // Find the maximum number of columns

    for (let start = 0; start < totalColumns; start += maxColumnsPerPage) {
      const chunk = rows.map(row => row.slice(start, start + maxColumnsPerPage));
      columnChunks.push(chunk);
    }

    // Generate HTML for all chunks
    let html = '';
    columnChunks.forEach((chunk, index) => {
      html += `<table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">`;
      chunk.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
          html += `<td style="border: 1px solid black; padding: 5px; text-align: left;">${cell || ''}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      if (index < columnChunks.length - 1) {
        html += '<div style="page-break-before: always;"></div>'; // Add a page break between chunks
      }
    });

    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({ path: outputPath, format: 'A4' });

    // Close the browser
    await browser.close();

    console.log('Conversion completed successfully!');
    console.log('PDF saved at:', outputPath);
  } catch (error) {
    console.error('Error during conversion:', error.message);
  }
}

// Example usage
const inputPath = path.join(process.cwd(), 'convertExcel.xlsx');
const outputPath = path.join(process.cwd(), 'xlsToPdf.pdf');

// Run the conversion
convertExcelToPdf(inputPath, outputPath);
