import path from 'path';
import fs from 'fs';
import { compress } from 'compress-pdf';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const pdf = path.resolve(__dirname, './output/lecture29_merged.pdf');
  const buffer = await compress(pdf);

  const compressedPdf = path.resolve(__dirname, './output/compressed_pdf.pdf');
  await fs.promises.writeFile(compressedPdf, buffer);

  console.log('PDF compression complete!');
})();
