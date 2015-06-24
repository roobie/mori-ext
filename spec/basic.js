import {expect} from 'chai';
import {describe, it} from 'mocha';
import mori from 'mori';

import {
  equals,
  hash,

  isList,
  isSeq
} from '../src/mori-exts';

const should = function () {
  // thin wrapper around expect, so we can:
  // someVal::should().equal('the value');
  return expect(this).to;
};

describe('mori fundamentals', function () {
  describe('::equals', function () {
    it('should report true when collections are eq', function () {
      void mori.list(1, 2, 3)::equals(mori.vector(1, 2, 3))::should().be.true;
    });
  });
  describe('::hash', function () {
    it('should report true when collections are eq', function () {
      void mori.list(1, 2, 3)::hash()::should().be.defined;
    });
  });
});


describe('mori type predicates', function () {
  describe('::isList', function () {
    it('should check whether collection is a list', function () {
      void mori.list(1, 2, 3)::isList()::should().be.true;
      void mori.vector(1, 2, 3)::isList()::should().be.false;
    });
  });
  describe('::isSeq', function () {
    it('should check whether collection is a seq', function () {
      void mori.seq([1, 2, 3])::isSeq()::should().be.true;
      void mori.vector(1, 2, 3)::isSeq()::should().be.false;
    });
  });
});
