import {expect} from 'chai';
import {describe, it} from 'mocha';
import mori from 'mori';

import {
  equals,
  hash
} from '../src/mori-exts';

const should = function () {
  // thin wrapper around expect, so we can:
  // someVal::should().equal('the value');
  return expect(this).to;
};

describe('mori fundamentals', function () {
  describe('::equals', function () {
    it('should report true when collections are eq', function () {
      mori.list(1, 2, 3)::equals(mori.vector(1, 2, 3))::should().be.equal(true);
    });
  });
  describe('::hash', function () {
    it('should report true when collections are eq', function () {
      void mori.list(1, 2, 3)::hash()::should().be.defined;
    });
  });
});
