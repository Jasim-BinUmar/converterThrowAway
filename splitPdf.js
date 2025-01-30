import splitPdf from '@vtfk/pdf-splitter'

const pdfToSplit = {
  pdf: 'merged.pdf',
  ranges: ['1 2', '3'],
  outputDir: './files',
  outputName: 'splittedPdf',
  pdftkPath: process.env.PDFTK_EXT // Pass the path from the environment variable
}

const result = await splitPdf(pdfToSplit)
console.log(result)
