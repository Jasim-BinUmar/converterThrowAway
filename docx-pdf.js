import puppeteer from 'puppeteer';
import mammoth from 'mammoth';
import fs from 'fs';

async function convertDocxToHtml(docxPath, htmlPath) {
  try {
    const result = await mammoth.convertToHtml({ path: docxPath });
    const html = result.value;

    // Save the HTML to a file
    fs.writeFileSync(htmlPath, html);
    console.log(`HTML saved as ${htmlPath}`);
  } catch (err) {
    console.error('Error during DOCX to HTML conversion:', err);
  }
}

async function convertHtmlFileToPdf(htmlPath, pdfPath) {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Read the HTML file
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    console.log(`Setting HTML content from file: ${htmlPath}`);
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    console.log(`PDF file created successfully at ${pdfPath}`);
  } catch (error) {
    console.error('Error during HTML to PDF conversion:', error);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}

async function main() {
  const docxPath = './Research.docx';
  const htmlPath = './output.html';
  const pdfPath = './output.pdf';

  await convertDocxToHtml(docxPath, htmlPath);
  await convertHtmlFileToPdf(htmlPath, pdfPath);
}

main();
