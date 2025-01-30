import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function repairPDF(inputFile, outputFile) {
  try {
    await execAsync(`pdftk ${inputFile} output ${outputFile}`);
    console.log(`Repaired PDF saved as ${outputFile}`);
  } catch (error) {
    console.error('Error repairing PDF:', error);
  }
}

repairPDF('lecture29.pdf', 'repaired.pdf');
