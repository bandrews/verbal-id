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
  });
  describe('parse()', function () {
    it('should round trip correctly', function () {
      const id = verbalid.create();
      const parsed = verbalid.parse(id);
      const id2 = verbalid.create(parsed);

      assert.strictEqual(id, id2);
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
});
