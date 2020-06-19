
var verbalid = require('../index.js');
var natural = require('natural');

for (const word of verbalid.words) {
  const soundex = natural.SoundEx.process(word);
  const meta = natural.Metaphone.process(word);
  const leven = [];
  const soundexTwins = [];
  const metaphoneTwins = [];
  for (const other of verbalid.words) {
    if (word !== other) {
      if (natural.SoundEx.process(other) === soundex) {
        soundexTwins.push(other);
      }
      if (natural.Metaphone.process(other) === meta) {
        metaphoneTwins.push(other);
      }
      if (natural.LevenshteinDistance(word, other) < 2) {
        leven.push(other);
      }
    }
  }
  if (metaphoneTwins.length > 0 || leven.length > 0) {
    console.log(`${word};${soundexTwins.join(',')};${metaphoneTwins.join(',')};${leven.join(',')}`);
  }
}
