const compression = require('lzutf8');

worddb = 'ZHJhZ29ufGFycml2YWx8ZWxsaXBzZXxtZXJjaGFudHxkaXNofHR3aXN0fGF3YWtlfGVjxiJiYW1ib298dHJhdmVsfG1vdGhlcnxsZWdlbmR8cHJvbWlzZXxyZWZ1bmR8ZWZmaWNpZW50fGZpbmdlcnxraWxvZ3JhbXx3YXRlcnxzd2FufGJhc2lufHN0YWJsZXxzYW1wbGV8Z2xhbmNlfGZvb3R8ZmVlZGJhY2t8bmVzdHxzY2FyZnxtYXJrZXR8ZGVncmVlfGhhbmR8YnJlYWtmYXN0fHB1cnNlfHZpbGxhZ2V8Y2xvdWR8Z3Jhc3N8aW5zdXLFWnRpbGV8bGHEZGFsbHxjZWxlYnJhdGV8c3RyZXRjaHxodeUAsXNjdWxwdHVyZXxveHlnZW58cmV0YWls5ADAY2h8c3VjY2Vzc3xsZWPFJGltcG9ydOQBPnBhc3PEDHxzdWl0Y2FzZXxjYWxjaXVtfHNob2V8Ym94fGFsbG93fGNoYXR8c2F05AGAdGV8ZWFybHnkAUdmaXR8Y29tcGFueXxzaGVsZnxyYWRpb3xzaGnEVnBpbnxhbnRlbm5hxHZ1bOUA8nNpb258Y2xlcmt8cmV2ZeQBB2VwaXNvZMRydW5kYXJ5fHB1bXB8cm9ja3xnbG9iYWx8YnVpbGRpbmd8ZmFybWVyfHTkAbByb3NlfHBheW3EDXRvbW9ycm93fHlha3xjbGFzc2ljxCduaXN8ZWdn5AHC5AGOY2XFLmxpdHRsZXxpcm9u5AIeb3LkAPttfGRvbGxhcnx3b2xm5AGIZWN0fGNo5AE9Z3Jvd3RofGdhcmRlbuQCS3Vu5AFbZWFzxEFhbmdvfGhhcHB5fHN0b21hxBtpbGt8dXJnZXxub+YBsnXmAX93cmXEO2ZvcuQCKmV4aXR8bGVt5ALlbm51YWx8b27kASBkZWNrfGVkdWNhdMQPZm9ydHVuZXxzdWJq5ACVYmFua3xudW1iZeQAuWJi5AJEdHJhZGV8Y3JvY29k5AI5Z3VpZGVib29rfHNwb2tlbnxhaXLlAe5pZGVudGljYWzkAdhtcMRgaG9tZXdvcmt8c3VycGx1c3xyZWfEGHN0deQB0GVxdWlw5QE4Y2Vy5ACteXx0b3dlbHxv5AOWZ2Vja298c3R5bOQDjmxvZ2ljfGzlAu7kAj5vbnxyYW7kAKBocmlsbGVyfGph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';
const words = compression.decompress(worddb, { inputEncoding: 'Base64' }).split('|');

const MAX_INT_TEMPLATE = '0xFFFFFFFFF';
const MAX_INT = BigInt(MAX_INT_TEMPLATE);

const isString = (o) => {
  return Object.prototype.toString.call(o) === '[object String]';
};

const randomBigInt = () => {
  return BigInt(MAX_INT_TEMPLATE.replace(/[F]/g, function (c) {
    var r = Math.random() * 16 | 0;
    return r.toString(16);
  }));
};

const calcChecksum = (number) => {
  let checksumId = BigInt(number);
  let checksum = BigInt(0);
  const mask = BigInt(0xF);

  // Implement a BSD-like checksum operating on 4-bit chunks.
  for (let i = 0; i < 9; i++) {
    // Wrap around right shift the checksum
    checksum = (checksum >> 1n) + ((checksum & 1n) << 3n);
    // Add the current checksum ID state;
    checksum = (checksum + ((checksumId & mask))) & mask;
    // Cue up the next four bits.
    checksumId = checksumId >> 4n;
  }
  return checksum;
};

const parse = (id) => {
  // validate input is a string...
  if (!isString(id)) {
    return undefined;
  }

  // with exactly four tokens.
  const tokens = id.toLowerCase().split(' ');
  if (tokens.length !== 4) {
    return undefined;
  }

  // match the tokens to words.
  const INVALID_WORD = -1;
  const pieces = [INVALID_WORD, INVALID_WORD, INVALID_WORD, INVALID_WORD];
  for (let i = 0; i < 1024; i++) {
    for (let j = 0; j < 4; j++) {
      if (words[i] === tokens[j]) {
        pieces[j] = BigInt(i);
      }
    }
  }

  // if any token failed to match
  if (pieces[0] === INVALID_WORD || pieces[1] === INVALID_WORD || pieces[2] === INVALID_WORD || pieces[3] === INVALID_WORD) {
    return undefined;
  }

  // Extract checksum
  const checksum = pieces[3] & 0x0Fn;

  let number = pieces[3] >> 4n;
  number += pieces[2] << 6n;
  number += pieces[1] << 16n;
  number += pieces[0] << 26n;

  if (checksum !== calcChecksum(number)) {
    return undefined;
  }

  return number.toString(16);
};

const create = (id) => {
  let idNumber;
  if (id === undefined || id === null) {
    // no ID specified, generate a random one
    idNumber = randomBigInt();
  } else {
    // Attempt to parse the input ID
    if (isString(id) && id.match(/[abcdef0-9]+/)) {
      // Input is a string.  Does it start with 0x?
      if (id.startsWith('0x')) {
        idNumber = BigInt(id);
      } else {
        idNumber = BigInt('0x' + id);
      }
    } else if (typeof (id) === 'bigint') {
      // We were already passed a bigint
      idNumber = id;
    }
  }

  if (idNumber === undefined || idNumber < 0n || idNumber > MAX_INT) {
    return undefined;
  }

  // Generate the checksum...
  const checksum = calcChecksum(idNumber);

  // Then split the number into four chunks:
  // | chunk1 || chunk2 || chunk3 || chunk4 |
  // 543210987654321098765432109876543210cccc
  // |        36 bit ID number          |{  } {checksum}
  const chunk1 = ((idNumber >> 26n) & (0x3ffn));
  const chunk2 = ((idNumber >> 16n) & (0x3ffn));
  const chunk3 = ((idNumber >> 6n) & (0x3ffn));
  const chunk4 = ((idNumber << 4n) & (0x3ffn)) + checksum;

  const result = [words[chunk1], words[chunk2], words[chunk3], words[chunk4]];

  return result.join(' ');
};

exports.create = create;
exports.parse = parse;
exports.words = words;
