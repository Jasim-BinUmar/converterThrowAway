var mammoth = require("mammoth");
const fs = require('fs'); // Import the file system module

// Convert the DOCX to HTML
mammoth.convertToHtml({ path: "./document.docx" })
    .then(function (result) {
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion

        // Save the HTML to a file
        fs.writeFileSync("output.html", html);
        console.log("HTML saved as output.html");

        // Log any conversion messages (optional)
        if (messages.length > 0) {
            console.log("Conversion messages:", messages);
        }
    })
    .catch(function (err) {
        console.error("Error during conversion:", err);
    })
    .done();
