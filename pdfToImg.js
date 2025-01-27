const { promises: fs } = require("node:fs");
async function main() {
   const { pdf } = await import("pdf-to-img");
        let counter = 1;
        const document = await pdf("sample.pdf", { scale: 3 });
        for await (const image of document) {
          await fs.writeFile(`page${counter}.png`, image);
          counter++;
        }
      }
      main();