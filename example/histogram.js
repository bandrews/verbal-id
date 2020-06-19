let verbaluuid = require("../index.js");

let histogram = {};
const iterations = 5000000;
const fitFactor = (iterations/250/80);
for (let i=0; i<iterations; i++)
{
    let words = verbaluuid.create().split(" ");
    for (let word of words)
    {
        if (!histogram[word])
        {
            histogram[word] = 0;
        }
        histogram[word]++;
    }
};



for (let word of verbaluuid.words)
{
    console.log(word + (word.length < 8 ? "\t\t" : '\t') + ": "+histogram[word] + " - "+new Array(Math.round(histogram[word]/fitFactor) + 1).join( "*" ));
}
