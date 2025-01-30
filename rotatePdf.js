import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function rotatePDF(inputFile, outputFile, rotations) {
  const rotateArgs = rotations.map(r => `${r.page}${r.angle}`).join(' ');
  try {
    await execAsync(`pdftk ${inputFile} cat ${rotateArgs} output ${outputFile}`);
    console.log(`Rotated PDF saved as ${outputFile}`);
  } catch (error) {
    console.error('Error rotating PDF:', error);
  }
}

rotatePDF('merged.pdf', 'rotated.pdf', [{ page: '1', angle: 'east' }]);
