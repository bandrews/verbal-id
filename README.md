# verbal-id
JS library to generate unique identifiers consisting of words that are pronounceable, distinguishable and inclusive.

## Getting Started

#### Installation
~~~~
$ npm install verbal-id
~~~~

#### Importing
~~~~
const verbalid = require('verbal-id');
~~~~

#### Usage
~~~~

> verbalid.create()
'vacant brand orchestra kiwi'

> verbalid.parse("vacant brand orchestra kiwi")
'8aab9b999'

> verbalid.parse("vaycant brahnd orchistra keewee")
'8aab9b999'

> verbalid.create("8aab9b999")
'vacant brand orchestra kiwi'

> verbalid.parse("vacant brand orchestra dragon")    // valid words, but checksum is incorrect
undefined

~~~~

## Introduction
### Why a new library?
I wanted a unique identifier that my project's users could transfer verbally to each other without ambiguity.  This project builds on the foundation of other projects that offer similar concepts, such as [WCodes](https://wcodes.org/wordlist), with the following additional principles:

- verbal-id aggressively filters words that even have a small chance of being interpreted with negative connotations or potentially offensive meanings when combined with other words.
- verbal-id uses Metaphone phonetic codes to filter the word list for homophones and to match words entered by users, enabling the system to be tolerant to minor typos (e.g. "kiwi" and "keewee" map to the same metaphone code).
- verbal-id incorporates parity bits as a checksum to enable friendly error handling.

### How many bits are each ID?
The library generates four-word identifiers that represent 36-bit numbers with 4 bits of parity (calculated with the BSD checksum algorithm) for a total of 40 bits of data, 10 per word.

### What's the methodology you used to create the word list?
This project builds on the public domain wordlist published by the [WCodes](https://wcodes.org/wordlist) project as of 5/2020, with the following modifications:

  * Manually removed inappropriate or difficult to spell words, starting with the words on the "to be replaced" list
  * Filtered out homophones appearing on the [comp.speech homophones-1.01.txt](http://www.speech.cs.cmu.edu/comp.speech/Section1/Lexical/homophone.html) list.
  * Used [natural](https://www.npmjs.com/package/natural) to ensure every word on the list has a unique [Metaphone](https://en.wikipedia.org/wiki/Metaphone) code, removing words with similar pronunciations.
  * Manually added ~400 new words from the [12dicts 6of12](http://wordlist.aspell.net/12dicts-readme/#nof12) list to replenish the (significant) removals up to 1024 entries.
  
Building this wordlist is quite challenging, as there are a surprisingly limited number of words available in English that meet all the criteria.  After making the necessary removals, there were not enough choices available to replenish the list while maintaining the same design principles from WCodes.  As such, this project adopts a few unique criteria:  most notably, it permits common compound words that aren't typically hyphenated like 'landscape' and 'moonlight', which are prohibited under the WCodes rules.  This does mean there is a small potential for confusion, so users should be advised in UI text that they should expect to enter a 4 word code to mitigate these concerns.

### Why is the word list order randomized?

If an inappropriate or confusing word has slipped through the filter process, I plan to deprecate the word in future revisions of the package.  This package will guarantee backwards compatibility with reading previously generated codes, so any deprecated words will be implemented as alternates that are still recognized when decoding an ID.  

This implies that the words shouldn't be presented in alphabetical order in case we need to make a swap later!  It also reduces the chances of a small off-by-one error being caused by lexically similar words.

### I found an word I consider inappropriate in the word list, or verbal-id generated an inappropriate sequence of words as a code.

Please open an issue with the word or word(s) affected and the word list will be adjusted in a future release.

### How are bits apportioned to the words?

~~~~
  //   "word1"   "word2"   "word3"   "word4"
  // | chunk1 || chunk2 || chunk3 || chunk4 |
  // 543210987654321098765432109876543210cccc
  // |        36 bit ID number          |{  } {checksum}
~~~~

### This is English centric.

Yup, for now, at least.  Send me a pull request including a word list with similar qualities for another language, and I'll cheerfully include it in the package, though.

When translating, don't try to directly translate all the words from the English list - you should choose words in the target language that are distinct in pronunciation.

### I have questions or suggestions.

contact@mofangheavyindustries.com or open an issue!
