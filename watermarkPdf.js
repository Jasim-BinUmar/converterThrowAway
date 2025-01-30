import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function applyWatermark(inputFile, watermarkFile, outputFile) {
  try {
    await execAsync(`pdftk ${inputFile} background ${watermarkFile} output ${outputFile}`);
    console.log(`PDF with watermark saved as ${outputFile}`);
  } catch (error) {
    console.error('Error applying watermark:', error);
  }
}

applyWatermark('merged.pdf', 'watermark.pdf', 'watermarked.pdf');
