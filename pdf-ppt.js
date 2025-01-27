const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const pptxgen = require('pptxgenjs');

const inputPath = path.join(__dirname, 'samplepptx.pdf');
const outputPath = path.join(__dirname, 'output.pptx');

// Function to split text into chunks for slides
function splitIntoSlides(text, wordsPerSlide = 50) {
    const words = text.split(/\s+/);
    const slides = [];
    for (let i = 0; i < words.length; i += wordsPerSlide) {
        slides.push(words.slice(i, i + wordsPerSlide).join(' '));
    }
    return slides;
}

// Read and parse the PDF
fs.readFile(inputPath, (err, data) => {
    if (err) {
        console.error('Error reading the PDF file:', err);
        return;
    }

    pdfParse(data).then(result => {
        const pres = new pptxgen();
        const slides = splitIntoSlides(result.text);

        slides.forEach((slideText, index) => {
            let slide = pres.addSlide();
            slide.addText(slideText, {
                x: '5%',
                y: '5%',
                w: '90%',
                h: '90%',
                fontSize: 14,
                color: '363636'
            });
        });

        pres.writeFile({ fileName: outputPath })
            .then(fileName => {
                console.log(`PowerPoint saved as ${fileName}`);
            })
            .catch(err => {
                console.error('Error saving PowerPoint:', err);
            });
    }).catch(err => {
        console.error('Error parsing PDF:', err);
    });
});