import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function applyStamp(inputFile, stampFile, outputFile) {
  try {
    await execAsync(`pdftk ${inputFile} stamp ${stampFile} output ${outputFile}`);
    console.log(`PDF with stamp saved as ${outputFile}`);
  } catch (error) {
    console.error('Error applying stamp:', error);
  }
}

applyStamp('merged.pdf', 'watermark.pdf', 'stamped.pdf');
