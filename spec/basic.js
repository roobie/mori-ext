import {expect} from 'chai';
import {describe, it} from 'mocha';
import mori from 'mori';

import {
// Fundamentals

  equals,
  hash,

// Type Predicates

  isList,
  isSeq,
  isVector,
  isMap,
  isSet,
  isCollection,
  isSequential,
  isAssociative,
  isCounted,
  isIndexed,
  isReduceable,
  isSeqable,
  isReversible,

// Collections

  // list,
  // vector,
  // hashMap,
  // set,
  // sortedSet,
  // range,
  // queue,

// Collection Operations

  conj,
  into,
  assoc,
  dissoc,
  distinct,
  empty,
  get,
  getIn,
  hasKey,
  find,
  nth,
  last,
  assocIn,
  updateIn,
  count,
  isEmpty,
  peek,
  pop,
  zipmap,
  reverse,

// Vector Operations

  subvec,

// Hash Map Operations

  keys,
  vals,
  merge,

// Set Operations

  disj,
  union,
  intersection,
  difference,
  isSubset,
  isSuperset,

// Sequences

  first,
  rest,
  seq,
  cons,
  concat,
  flatten,
  intoArray,
  each,
  map,
  mapcat,
  filter,
  remove,
  reduce,
  reduceKV,
  take,
  takeWhile,
  drop,
  dropWhile,
  some,
  every,
  sort,
  sortBy,
  interpose,
  interleave,
  iterate,
  repeat,
  repeatedly,
  partition,
  partitionBy,
  groupBy,

// Helpers

  primSeq,
  identity,
  constantly,
  inc,
  dec,
  sum,
  isEven,
  isOdd,
  comp,
  juxt,
  knit,
  pipeline,
  partial,
  curry,
  fnil,
  toClj,
  toJs,
} from '../src/mori-exts';

const should = function () {
  // thin wrapper around expect, so we can:
  // someVal::should().equal('the value');
  return expect(this).to;
};

describe(`mori fundamentals`, function () {
  describe(`::equals`, function () {
    it(`should report true when collections are eq`, function () {
      void mori.list(1, 2, 3)::equals(mori.vector(1, 2, 3))::should().be.true;
    });
  });
  describe(`::hash`, function () {
    it(`should report true when collections are eq`, function () {
      void mori.list(1, 2, 3)::hash()::should().be.defined;
    });
  });
});


describe(`mori type predicates`, function () {
  describe(`::isList`, function () {
    it(`should check whether collection is a list`, function () {
      void mori.list(1, 2, 3)::isList()::should().be.true;
      void mori.vector(1, 2, 3)::isList()::should().be.false;
    });
  });
  describe(`::isSeq`, function () {
    it(`should check whether collection is a seq`, function () {
      void mori.seq([1, 2, 3])::isSeq()::should().be.true;
      void mori.vector(1, 2, 3)::isSeq()::should().be.false;
    });
  });
});


describe(`mori collection operations`, function () {
  describe(`::conj`, function () {
    it(`should conjoin the supplied item(s) to the collection`, function () {
      void mori.vector(1, 2)::conj(3, 4, 5)::equals(mori.vector(1, 2, 3, 4, 5))
        ::should().be.true;

      void mori.list(4, 5)::conj(3, 2, 1)::equals(mori.vector(1, 2, 3, 4, 5))
        ::should().be.true;
    });
  });
  describe(`::into`, function () {
    it(`should iteratively conjoin the supplied item(s)
        to the collection`, function () {
      const lst = mori.list(3, 4);
      const vec = mori.vector(1, 2);
      void lst::into(vec)::equals(mori.list(2, 1, 3, 4))
        ::should().be.true;
      void lst::into(lst)::equals(mori.list(4, 3, 3, 4))
        ::should().be.true;

      void vec::into(lst)::equals(mori.vector(1, 2, 3, 4))
        ::should().be.true;
      void vec::into(vec)::equals(mori.vector(1, 2, 1, 2))
        ::should().be.true;
    });
  });
  describe(`::assoc`, function () {
    it(`should associate values into an associative collection`, function () {
      const v = mori.vector('foo', 'bar', 'baz');
      void v::assoc(1, 'quux')::equals(mori.vector('foo', 'quux', 'baz'))
        ::should().be.true;

      const m = mori.hashMap('foo', 1);
      void m::assoc('bar', 2)::equals(mori.hashMap('foo', 1, 'bar', 2))
        ::should().be.true;
      void m::assoc('foo', 5)::equals(mori.hashMap('foo', 5))
        ::should().be.true;
    });
  });
});

describe(`mori sequences`, function () {

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  describe('::cons', function () {
    it('should construct a new sequence', function () {
      1::cons(mori.vector(2, 3))::toJs()::should().deep.equal([1, 2, 3]);
    })
  })

  describe(`::partition`, function () {
    it(`should partition the collection`, function () {
      const ps = arr::partition(2);

      ps::toJs()::should().deep.equal(
        [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]
      );

    });
    it(`should partition and pad the collection`, function () {
      const ps = arr::partition(2, 1);

      ps::toJs()::should().deep.equal(
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]
      );
    });
  });
});
