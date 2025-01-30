import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function decryptPDF(inputFile, outputFile, password) {
  try {
    await execAsync(`pdftk ${inputFile} input_pw ${password} output ${outputFile}`);
    console.log(`Decrypted PDF saved as ${outputFile}`);
  } catch (error) {
    console.error('Error decrypting PDF:', error);
  }
}

decryptPDF('encrypted.pdf', 'decrypted.pdf', 'userpass');
