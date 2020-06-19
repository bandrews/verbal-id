# verbal-uuid
JS library to generate unique identifiers consisting of words that are pronounceable, distinguishable and inclusive.

## Getting Started

#### Installation
~~~~
$npm install verbal-uuid
~~~~

#### Usage
~~~~
import verbal-uuid from 'verbal-uuid';

const id = verbal-uuid.create();
console.log(id);                // "tropical daffodil party"

const idnumber = verbal-uuid.parse(id);
console.log(idnumber);                   // 2712847316
console.log(idnumber.toString(16));      // a1b2c3d4
console.log(idnumber.toString(16));      // a1b2c3d4

console.log(verbal-uuid.parse("tropical daffodill party"))   // 2712847316
console.log(verbal-uuid.parse("tropical daffodil kangaroo")) // undefined (fails parity check)
~~~~

## Introduction
### Why a new library?
I wanted a unique identifier that my project's users could transfer verbally to each other without ambiguity.  Existing projects like [WCodes](https://wcodes.org/wordlist) have provided a similar idea, but the word list contains homophones and words with negative connotations.

I also wanted the system to be tolerant to minor typos, which necessitated adopting a word list which is interally unique when checked using common edit distance techniques.

### How many bits are each ID?
The library generates three-word identifiers that represent 32-bit numbers with 4 bits of parity (calculated with the BSD checksum algorithm).  It can easily be repurposed to represent 128-bit RFC4122 UUIDs.

### What's the methodology you used to create the word list?
From a starting point of the public domain WCodes list, I:

  * Manually removed inappropriate or difficult to spell words 
  * Filtered out homophones using the [comp.speech homophones-1.01.txt](http://www.speech.cs.cmu.edu/comp.speech/Section1/Lexical/homophone.html) list.
  * Used [natural](https://www.npmjs.com/package/natural) to ensure every word on the list has a unique [Soundex](https://en.wikipedia.org/wiki/Soundex) and [Metaphone](https://en.wikipedia.org/wiki/Metaphone) code, removing words with similar pronunciations.
  * Removed words to eliminate all pairs with a [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) of less than 2.
  * Manually added ~400 new words from the [12dicts 6of12](http://wordlist.aspell.net/12dicts-readme/#nof12) list to replenish the (significant) removals up to 1024 entries.
  
I discarded a few limitations WCodes adopted;  most notably, this list permits common compound words that aren't typically hyphenated like 'landscape' and 'moonlight'.

### Why is the word list randomized?

If an inappropriate or confusing word has slipped through the filter process, I plan to deprecate the word in future revisions of the package.  This package will guarantee backwards compatibility with reading previously generated codes, so any deprecated words will be implemented as alternates that are still recognized when decoding an ID.

### This is English centric.

Yup, for now, at least.  Send me a pull request including a word list with similar qualities for another language, and I'll cheerfully include it in the package, though.

When translating, don't try to directly translate all the words from the English list - you should choose words in the target language that are distinct in pronunciation.

### I have questions.

contact@mofangheavyindustries.com
