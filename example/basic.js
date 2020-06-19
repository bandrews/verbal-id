let verbaluuid = require("../index.js")

let words = verbaluuid.create("31337");
if (words === "magazine skill dragon awake") {
    console.log("Created successfully!");
}

let number = verbaluuid.parse(words);
if (number === "31337") {
    console.log("Parsed successfully!");
}

let randomId = verbaluuid.create();
console.log(`A random ID for you:  ${randomId}`);
