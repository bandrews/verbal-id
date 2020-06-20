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

> verbalid.create("8aab9b999")
'vacant brand orchestra kiwi'

> verbalid.parse("vacant brand orchestra kiwi")    // valid words, but checksum is incorrect
undefined

~~~~

## Introduction
### Why a new library?
I wanted a unique identifier that my project's users could transfer verbally to each other without ambiguity.  Existing projects like [WCodes](https://wcodes.org/wordlist) have provided a similar idea, but the word list contains homophones and words with negative connotations.

I also wanted the system to be tolerant to minor typos, which necessitated adopting a word list which is interally unique using phonetic codes generated using Metaphone.

### How many bits are each ID?
The library generates four-word identifiers that represent 36-bit numbers with 4 bits of parity (calculated with the BSD checksum algorithm) for a total of 40 bits of data, 10 per word.

### What's the methodology you used to create the word list?
From a starting point of the public domain WCodes list, I:

  * Manually removed inappropriate or difficult to spell words 
  * Filtered out homophones using the [comp.speech homophones-1.01.txt](http://www.speech.cs.cmu.edu/comp.speech/Section1/Lexical/homophone.html) list.
  * Used [natural](https://www.npmjs.com/package/natural) to ensure every word on the list has a unique [Metaphone](https://en.wikipedia.org/wiki/Metaphone) code, removing words with similar pronunciations.
  * Manually added ~400 new words from the [12dicts 6of12](http://wordlist.aspell.net/12dicts-readme/#nof12) list to replenish the (significant) removals up to 1024 entries.
  
I discarded a few limitations WCodes adopted;  most notably, this list permits common compound words that aren't typically hyphenated like 'landscape' and 'moonlight'.

### Why is the word list order randomized?

If an inappropriate or confusing word has slipped through the filter process, I plan to deprecate the word in future revisions of the package.  This package will guarantee backwards compatibility with reading previously generated codes, so any deprecated words will be implemented as alternates that are still recognized when decoding an ID.  

This implies that the words shouldn't be presented in alphabetical order in case we need to make a swap later!  It also reduces the chances of a small off-by-one error being caused by lexically similar words.

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
