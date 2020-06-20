var assert = require('assert');
var verbalid = require('../index.js');
var natural = require('natural');

describe('verbal-uuid', function () {
  describe('create()', function () {
    it('should return four words', function () {
      assert.strictEqual(4, verbalid.create().split(' ').length);
    });
    it('should return "depth branch texture chocolate" for "987654321"', function () {
      assert.strictEqual('depth branch texture chocolate', verbalid.create('987654321'));
    });
    it('should return "depth branch texture chocolate" for "0x987654321"', function () {
      assert.strictEqual('depth branch texture chocolate', verbalid.create('0x987654321'));
    });
    it('should return "depth branch texture chocolate" for 0x987654321n', function () {
      assert.strictEqual('depth branch texture chocolate', verbalid.create(0x987654321n));
    });
    it('should return "dragon dragon dragon dragon" for 0x0n', function () {
      assert.strictEqual('dragon dragon dragon dragon', verbalid.create(0x0n));
    });
    it('should return "dragon dragon dragon water" for 0x1n', function () {
      assert.strictEqual('dragon dragon dragon water', verbalid.create(0x1n));
    });
    it('should return "robin robin robin accurate" for 0xffffffffen', function () {
      assert.strictEqual('robin robin robin accurate', verbalid.create(0xffffffffen));
    });
    it('should return "robin robin robin career" for 0xfffffffffn', function () {
      assert.strictEqual('robin robin robin career', verbalid.create(0xfffffffffn));
    });
    it('should return "robin robin robin career" for "0xfFfFfFfFf"', function () {
      assert.strictEqual('robin robin robin career', verbalid.create('0xfFfFfFfFf'));
    });
    it('should return undefined for 0x10000000000n', function () {
      assert.strictEqual(undefined, verbalid.create(0x10000000000n));
    });
    it('should return undefined for -1n', function () {
      assert.strictEqual(undefined, verbalid.create(-1n));
    });
    it('should generate consistently for the first 32 values', function () {
      const correct = ['dragon dragon dragon dragon',
        'dragon dragon dragon water',
        'dragon dragon dragon grass',
        'dragon dragon dragon calcium',
        'dragon dragon dragon reverse',
        'dragon dragon dragon cement',
        'dragon dragon dragon urge',
        'dragon dragon dragon crocodile',
        'dragon dragon dragon land',
        'dragon dragon dragon vertical',
        'dragon dragon dragon ultimate',
        'dragon dragon dragon platform',
        'dragon dragon dragon select',
        'dragon dragon dragon sphere',
        'dragon dragon dragon attach',
        'dragon dragon dragon castle',
        'dragon dragon dragon cake',
        'dragon dragon dragon respect',
        'dragon dragon dragon collect',
        'dragon dragon dragon comedy',
        'dragon dragon dragon text',
        'dragon dragon dragon museum',
        'dragon dragon dragon mars',
        'dragon dragon dragon railroad',
        'dragon dragon dragon bath',
        'dragon dragon dragon state',
        'dragon dragon dragon nickname',
        'dragon dragon dragon segment',
        'dragon dragon dragon essential',
        'dragon dragon dragon wise',
        'dragon dragon dragon proton',
        'dragon dragon dragon shampoo',
        'dragon dragon dragon apartment',
        'dragon dragon dragon nerve',
        'dragon dragon dragon curtain',
        'dragon dragon dragon mat'];

      for (let i = 0; i < 32; i++) {
        assert.strictEqual(correct[i], verbalid.create(i.toString(16)));
      }
    });
    it('should generate consistently for the last 64 values', function () {
      const correct = [
        'robin robin robin career',
        'robin robin robin accurate',
        'robin robin robin task',
        'robin robin robin tortoise',
        'robin robin robin judge',
        'robin robin robin bright',
        'robin robin robin clover',
        'robin robin robin reliable',
        'robin robin robin typical',
        'robin robin robin clay',
        'robin robin robin tsunami',
        'robin robin robin anchor',
        'robin robin robin sister',
        'robin robin robin minister',
        'robin robin robin pipe',
        'robin robin robin digital',
        'robin robin robin mushroom',
        'robin robin robin crayon',
        'robin robin robin cardboard',
        'robin robin robin custom',
        'robin robin robin brand',
        'robin robin robin vulture',
        'robin robin robin comb',
        'robin robin robin baker',
        'robin robin robin worth',
        'robin robin robin feast',
        'robin robin robin saddle',
        'robin robin robin kettle',
        'robin robin robin wind',
        'robin robin robin curtain',
        'robin robin robin athlete',
        'robin robin robin device',
        'robin robin robin gift',
        'robin robin robin hotel',
        'robin robin robin potential',
        'robin robin robin juice',
        'robin robin robin advanced',
        'robin robin robin matrix',
        'robin robin robin canvas',
        'robin robin robin coffee',
        'robin robin robin type',
        'robin robin robin fog',
        'robin robin robin girl',
        'robin robin robin text',
        'robin robin robin citizen',
        'robin robin robin edge',
        'robin robin robin carriage',
        'robin robin robin lily',
        'robin robin robin hill',
        'robin robin robin fountain',
        'robin robin robin smart',
        'robin robin robin venture',
        'robin robin robin question',
        'robin robin robin truth',
        'robin robin robin proper',
        'robin robin robin pizza',
        'robin robin robin fortune',
        'robin robin robin urge',
        'robin robin robin yak',
        'robin robin robin vision',
        'robin robin robin shelf',
        'robin robin robin watch',
        'robin robin robin scarf',
        'robin robin robin legend'
      ];

      for (let i = 0; i < 64; i++) {
        assert.strictEqual(correct[i], verbalid.create((0xFFFFFFFFF - i).toString(16)));
      }
    });
  });
  describe('parse()', function () {
    it('should round trip correctly', function () {
      const id = verbalid.create();
      const parsed = verbalid.parse(id);
      const id2 = verbalid.create(parsed);

      assert.strictEqual(id, id2);
    });
    it('should parse input as case insensitive', function () {
      assert.strictEqual('987654321', verbalid.parse('DEPTH branch Texture ChoColAte'));
    });
    it('should return "0" for "dragon dragon dragon dragon"', function () {
      assert.strictEqual('0', verbalid.parse('dragon dragon dragon dragon'));
    });
    it('should return 0x1n for "dragon dragon dragon water" for 0x1n', function () {
      assert.strictEqual('0', verbalid.parse('dragon dragon dragon dragon'));
    });
    it('should return "ffffffffe" for "robin robin robin accurate"', function () {
      assert.strictEqual('ffffffffe', verbalid.parse('robin robin robin accurate'));
    });
    it('should return "fffffffff" for "robin robin robin career"', function () {
      assert.strictEqual('fffffffff', verbalid.parse('robin robin robin career'));
    });
    it('should return "987654321" for "depth branch texture chocolate"', function () {
      assert.strictEqual('987654321', verbalid.parse('depth branch texture chocolate'));
    });
    it('should return undefined for "depth branch texture dragon"', function () {
      assert.strictEqual(undefined, verbalid.parse('depth branch texture dragon'));
    });
    it('should return undefined for "asdf"', function () {
      assert.strictEqual(undefined, verbalid.parse('asdf'));
    });
    it('should return undefined for "asdf asdf asdf asdf"', function () {
      assert.strictEqual(undefined, verbalid.parse('asdf asdf asdf asdf'));
    });

    it('should handle misspellings by returning "0" for "draagon dragon dragon dragon"', function () {
      assert.strictEqual('0', verbalid.parse('draagon dragon dragon dragon'));
    });

    it('should handle misspellings by returning "987654321" for "dipth beranche tekstuyr chockolatt"', function () {
      assert.strictEqual('987654321', verbalid.parse('depth branch texture chocolate'));
    });
  });
});
describe('word list', function () {
  it('should have 1024 words', function () {
    assert.strictEqual(verbalid.words.length, 1024);
  });
  it('should contain words with unique Metaphone codes', function () {
    this.timeout(10000);
    for (let i = 0; i < verbalid.words.length; i++) {
      for (let j = i + 1; j < verbalid.words.length; j++) {
        assert.notStrictEqual(natural.Metaphone.process(verbalid.words[i]), natural.Metaphone.process(verbalid.words[j]));
      }
    }
  });
});
