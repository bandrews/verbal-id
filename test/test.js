var assert = require('assert');
var verbalid = require('../index.js');

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
  });
  describe('parse()', function () {
    it('should round trip correctly', function () {
      const id = verbalid.create();
      const parsed = verbalid.parse(id);
      const id2 = verbalid.create(parsed);

      assert.strictEqual(id, id2);
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
  });
  describe('word list', function () {
    it('should have 1024 words', function () {
      assert.strictEqual(verbalid.words.length, 1024);
    });
  });
});
