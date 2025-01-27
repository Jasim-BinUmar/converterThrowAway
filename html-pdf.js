// var html_to_pdf = require('html-pdf-node');
// const fs = require('fs'); // Import the file system module

// // PDF generation options
// let options = { format: 'A4' };

// // Input source for the PDF
// let file = { url: "https://www.npmjs.com/package/converithtmldocx2?activeTab=readme" };

// // Generate the PDF and save it to a file
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//   // Save the PDF to the filesystem
//   fs.writeFileSync('output.pdf', pdfBuffer);

//   console.log("PDF saved as output.pdf");
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import puppeteer from 'puppeteer';

// async function convertUrlToPdf(url, pdfPath) {
//   let browser;
//   try {
//     console.log('Launching browser...');
//     browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     console.log(`Navigating to URL: ${url}`);
//     await page.goto(url, { waitUntil: 'networkidle0' });

//     console.log('Generating PDF...');
//     await page.pdf({
//       path: pdfPath,
//       format: 'A4',
//       printBackground: true,
//       margin: {
//         top: '20px',
//         right: '20px',
//         bottom: '20px',
//         left: '20px'
//       }
//     });

//     console.log(`PDF file created successfully at ${pdfPath}`);
//   } catch (error) {
//     console.error('Error:', error.message);
//   } finally {
//     if (browser) {
//       console.log('Closing browser...');
//       await browser.close();
//     }
//   }
// }

// // Example usage
// const url = 'https://www.npmjs.com/package/converithtmldocx2?activeTab=readme'; // Replace with the desired URL
// const pdfPath = './output.pdf';

// convertUrlToPdf(url, pdfPath);




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import puppeteer from 'puppeteer';

async function convertUrlToPdf(url, pdfPath) {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: false }); // Debugging enabled
    const page = await browser.newPage();

    console.log(`Setting user agent and navigating to URL: ${url}`);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); // 60 seconds timeout

    console.log('Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    console.log(`PDF file created successfully at ${pdfPath}`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}

// Example usage
const url = 'https://www.turing.com/interview-questions/react-native'; // Replace with your URL
const pdfPath = './output.pdf';

convertUrlToPdf(url, pdfPath);
