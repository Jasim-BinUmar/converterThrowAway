import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function encryptPDF(inputFile, outputFile, userPassword, ownerPassword) {
  try {
    await execAsync(`pdftk ${inputFile} output ${outputFile} user_pw ${userPassword} owner_pw ${ownerPassword}`);
    console.log(`Encrypted PDF saved as ${outputFile}`);
  } catch (error) {
    console.error('Error encrypting PDF:', error);
  }
}

encryptPDF('merged.pdf', 'encrypted.pdf', 'userpass', 'ownerpass');
