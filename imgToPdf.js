// const { convert, sizes } = require('image-to-pdf');
// const fs = require('fs')

// const pages = [
//     "./images/page1.png", // path to the image
//     "data:image/png;base64,iVBORw...", // base64
//     fs.readFileSync('./images/image3.png') // Buffer
// ]
 
// convert(pages, sizes.A4).pipe(fs.createWriteStream('output.pdf'))

const imagesToPdf = require('images-to-pdf');
const path = require('path');
const fs = require('fs').promises;

async function convertImagesToPdf(inputImages, outputPath) {
    try {
        // Validate input images exist
        for (const image of inputImages) {
            try {
                await fs.access(image);
            } catch (error) {
                throw new Error(`Image not found: ${image}`);
            }
        }

        console.log('Starting conversion...');
        console.log('Input images:', inputImages);
        console.log('Output PDF:', outputPath);

        // Convert images to PDF
        await imagesToPdf(inputImages, outputPath);

        console.log('Conversion completed successfully!');
        console.log('PDF saved at:', outputPath);
    } catch (error) {
        console.error('Error during conversion:', error.message);
    }
}

// Example usage
const images = [
    path.join(process.cwd(), 'image1.jpg'),
    path.join(process.cwd(), 'image2.png'),
    path.join(process.cwd(), 'image3.jpeg')
];

const outputPath = path.join(process.cwd(), 'output.pdf');
const singleImage = path.join(process.cwd(), './images/image3.png');

convertImagesToPdf([singleImage], outputPath);
// Run the conversion for collection of images
//convertImagesToPdf(images, outputPath);