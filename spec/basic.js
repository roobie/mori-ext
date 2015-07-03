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
} from '../src/mori-ext';

const should = function () {
  // thin wrapper around expect, so we can:
  // someVal::should().equal('the value');
  return expect(this).to;
};

describe(`mori fundamentals`, function () {
  describe(`::equals`, function () {
    it(`should report true when collections are eq`, function () {
      void mori.list(1, 2, 3)::equals(mori.vector(1, 2, 3))
        ::should().be.true;
    });
  });
  describe(`::hash`, function () {
    it(`should report true when collections are eq`, function () {
      void mori.list(1, 2, 3)::hash()
        ::should().be.defined;
    });
  });
});


describe(`mori type predicates`, function () {
  const coercedSeq = mori.seq([1, 2, 3]);
  const infSeq = 5::repeat();
  const l = mori.list(1, 2, 3);
  const v = mori.vector(1, 2, 3);
  const m = mori.hashMap('foo', 1, 'bar', 2);
  const s = mori.set('a', 'b', 'c');

  describe(`::isList`, function () {
    it(`should test for list`, function () {
      void l::isList()
        ::should().be.true;
      void v::isList()
        ::should().be.false;
    });
  });

  describe(`::isSeq`, function () {
    it(`should test for seq`, function () {
      void coercedSeq::isSeq()
        ::should().be.true;
      void v::isSeq()
        ::should().be.false;
    });
  });

  describe(`::isVector`, function () {
    it(`should test for vector`, function () {
      void v::isVector()
        ::should().be.true;
      void l::isVector()
        ::should().be.false;
    });
  });

  describe('::isMap', function () {
    it('map is map', function () {
      void m::isMap()
        ::should().be.true;
    });
    it('list is not map', function () {
      void l::isMap()
        ::should().be.false;
    });
  });

  describe('::isSet', function () {
    it('should test for set', function () {
      void s::isSet()
        ::should().be.true;
      void l::isSet()
        ::should().be.false;
    });
  });

  describe('::isCollection', function () {
    it('should test for collection', function () {
      void m::isCollection()
        ::should().be.true;
      void 1::isCollection()
        ::should().be.false;
    });
  });

  describe('::isSequential', function () {
    it('should test for sequential', function () {
      void v::isSequential()
        ::should().be.true;
      void s::isSequential()
        ::should().be.false;
    });
  });

  describe('::isAssociative', function () {
    it('should test for associativity', function () {
      void m::isAssociative()
        ::should().be.true;
      void l::isAssociative()
        ::should().be.false;
    });
  });

  describe('::isCounted', function () {
    it('infinite seq is not counted', function () {
      void infSeq::isCounted()
        ::should().be.false;
    });
    it('vector is counted', function () {
      void v::isCounted()
        ::should().be.true;
    });
  });

  describe('::isIndexed', function () {
    it('should test for indexed', function () {
      void v::isIndexed()
        ::should().be.true;
      void l::isIndexed()
        ::should().be.false;
    });
  });

  describe('::isReduceable', function () {
    it('should test for reducability', function () {
      void 1::isReduceable()
        ::should().be.false;
      void l::isReduceable()
        ::should().be.true;
      void v::isReduceable()
        ::should().be.true;
    });
  });

  describe('::isSeqable', function () {
    it('should test for seqability', function () {
      void 1::isSeqable()
        ::should().be.false;
      void l::isSeqable()
        ::should().be.true;
      void v::isSeqable()
        ::should().be.true;
    });
  });

  describe('::isReversible', function () {
    it('should test for reversibility', function () {
      void l::isReversible()
        ::should().be.false;
      void v::isReversible()
        ::should().be.true;
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

  describe('::dissoc', function () {
    it('should dissassociate', function () {
      var m = mori.hashMap('foo', 1, 'bar', 2, 'baz', 3);
      void m::dissoc('bar', 'baz')::equals(mori.hashMap('foo', 1))
        ::should().be.true;
    });
  });

  describe('::distinct', function () {
    it('should remove duplicates and return a seq', function () {
      const arr = [1, 1, 2, 3, 2];
      const set = mori.set(arr);
      const vec = mori.vector(...arr);
      set::toJs()::should().deep.equal(vec::distinct()::toJs());
      void set::seq()::equals(vec::distinct())::should().be.true;
    });
  });

  describe('::empty', function () {
    it('should empty the collection', function () {
      void mori.vector(1, 2)::empty()::equals(mori.vector())
        ::should().be.true;
    });
  });

  describe('::get', function () {
    const v = mori.vector(10, 11, 12);
    const m = mori.hashMap('foo', 1, 'bar', 2);

    it('should retrive a value based on key', function () {
      v::get(0)::should().equal(10);
      m::get('bar')::should().equal(2);
    });

    it('should default to the value supplied', function () {
      v::get(3, 30)::should().equal(30);
      m::get('quux', 'baz')::should().equal('baz');
    });
  });

  describe('::getIn', function () {
    const v = mori.vector('foo', 'bar', 'baz');
    const v2 = mori.vector('quux', v);
    const m = mori.hashMap('foo', 1, 'bar', 2);
    const m2 = mori.hashMap('baz', 3, 'quux', m);

    it('should retrive the nested value', function () {
      v2::getIn([1, 2])::should().equal('baz');
      m2::getIn(['quux', 'bar'])::should().equal(2);
    });
    it('should default to the supplied argument', function () {
      const notFound = 'default';
      v2::getIn([999, 888], notFound)::should().equal(notFound);
    });
  });

  describe('::hasKey', function () {
    const v = mori.vector(1);

    it('should tell whether the key exists', function () {
      void v::hasKey(0)::should().be.true;
      void v::hasKey(999)::should().be.false;
    });
  });

  describe('::find', function () {
    it('should find the element based on key', function () {
      const m = mori.hashMap('foo', 1, 'bar', 2);

      m::find('foo')::toJs()::should().deep.equal(['foo', 1]);
      void m::find('quux')::should().be.null;
    });
  });

  describe('::nth', function () {
    it('should get the nth element', function () {
      const v = mori.vector('foo', 'bar', 'baz');
      v::nth(1)::should().equal('bar');
    });
  });

  describe('::last', function () {
    it('should get the last element', function () {
      mori.vector(1, 2, 3)::last()::should().equal(3);
    });
  });

  describe('::assocIn', function () {
    it('should ', function () {
      const m = mori.hashMap('foo', mori.hashMap('bar', 1));
      m::assocIn(['foo', 'baz'], 2)::get('foo')
        ::toJs()
        ::should().deep.equal({bar: 1, baz: 2});
    });
  });

  describe('::updateIn', function () {
    it('should ', function () {
      const m = mori.hashMap('foo', mori.hashMap('bar', 1));
      m::updateIn(['foo', 'bar'], mori.inc)::get('foo')
        ::toJs()
        ::should().deep.equal({bar: 2});
    });
  });

  describe('::count', function () {
    it('should tell the length', function () {
      mori.vector(0, 0, 0)::count()
        ::should().equal(3);
    });
  });

  describe('::isEmpty', function () {
    it('should tell whether it is empty or not', function () {
      void mori.vector(0, 0, 0)::isEmpty()
        ::should().be.false;
      void mori.vector()::isEmpty()
        ::should().be.true;
    });
  });

  describe('::peek', function () {
    it('should show the "first" item in the sequence', function () {
      mori.list('foo', 'bar', 'baz')::peek()
        ::should().equal('foo');
      mori.vector('foo', 'bar', 'baz')::peek()
        ::should().equal('baz');
    });
  });

  describe('::pop', function () {
    it('should ', function () {
      mori.list('foo', 'bar', 'baz')::pop()
        ::toJs()
        ::should().deep.equal(['bar', 'baz']);
      mori.vector('foo', 'bar', 'baz')::pop()
        ::toJs()
        ::should().deep.equal(['foo', 'bar']);
    });
  });

  describe('::zipmap', function () {
    it('should zip two seqables into a hash map', function () {
      const keyz = ['foo', 'bar', 'baz'];
      const valz = [1, 2, 3];
      const hmap = keyz::zipmap(valz);
      hmap::toJs()::should().deep.equal({foo: 1, bar: 2, baz: 3});
    });
  });

  describe('::reverse', function () {
    it('should ', function () {
      mori.vector(1, 2, 3)::reverse()
        ::toJs()
        ::should().deep.equal([3, 2, 1]);
    });
  });
});



describe('mori hash map operations', function () {
  const hmap = mori.hashMap('foo', 1, 'bar', 2);

  describe('::keys', function () {
    it('should give us a sequence of the keys', function () {
      void hmap::keys()
        ::equals(mori.list('foo', 'bar'))
        ::should().be.true;
    });
  });

  describe('::vals', function () {
    it('should give us a sequence of the values', function () {
      void hmap::vals()
        ::equals(mori.list(1, 2))
        ::should().be.true;
    });
  });

  describe('::merge', function () {
    it('should merge two maps', function () {
      void hmap::merge(mori.hashMap('baz', 3))
        ::toJs()
        ::should().deep.equal({
          foo: 1,
          bar: 2,
          baz: 3,
        });
    });
  });
});

describe('mori vector operations', function () {
  const {vector} = mori;

  describe('::subvec', function () {
    it('should slice a vector', function () {
      void vector('cat', 'dog', 'bunny', 'cow')::subvec(1, 3)
        ::toJs()
        ::should().deep.equal(['dog', 'bunny']);
    });
  });
});

describe('mori set operations', function () {
  const {set} = mori;

  describe('::disj', function () {
    it('should remove an element from a set', function () {
      void set([1, 2, 3])::disj(3)
        ::equals(mori.set([1, 2]))
        ::should().be.true;
    });
  });

  describe('::union', function () {
    it('should return the union of two or more sets', function () {
      void set([1, 2])::union(set([2, 3]), mori.set([3, 4]))
        ::equals(set([1, 2, 3, 4]))
        ::should().be.true;
    });
  });

  describe('::intersection', function () {
    it('should intersect two or more sets', function () {
      void set([1, 2, 3])::intersection(set([2, 3, 4]))
        ::equals(set([2, 3]))
        ::should().be.true;
    });
  });

  describe('::difference', function () {
    it('should return the difference of two or more sets', function () {
      void set([1, 3])::difference(set([3, 1]))
        .toString()
        ::should().equal('#{}');
    });
  });

  describe('-->', function () {
    const sup = set([1, 2, 3]);
    const sub = set([2, 3]);
    const notSub = set([3, 4]);

    describe('::isSubset', function () {
      it('should tell whether the set is a subset of the other', function () {
        void sub::isSubset(sup)::should().be.true;
        void sup::isSubset(sup)::should().be.true;
        void notSub::isSubset(sup)::should().be.false;
      });
    });

    describe('::isSuperset', function () {
      it('should tell whether the set is a superset of the other', function () {
        void sub::isSuperset(sup)::should().be.false;
        void sup::isSuperset(sup)::should().be.true;
        void sup::isSuperset(sub)::should().be.true;
      });
    });
  });
});

describe(`mori sequences`, function () {
  const {vector} = mori;
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const vec = vector(...arr);

  describe('::first', function () {
    it('should get the first element', function () {
      vec::first()
      ::should().equal(arr[0]);
    });
  });

  describe('::rest', function () {
    it('should get the rest of the elements', function () {
      vec::rest()
      ::toJs()
      ::should().deep.equal(arr.slice(1));
    });
  });

  describe('::', function () {
    it('should ', function () {

    });
  });

  describe('::seq', function () {
    it('should create a seq', function () {
      const seq1 = arr::seq();
      const seq2 = vector(...arr)::seq();
      void seq1::toJs()::should().deep.equal(seq2::toJs());
      void seq1::equals(seq2)::should().be.true;
    });
  });

  describe('::cons', function () {
    it('should construct a new sequence', function () {
      1::cons(mori.vector(2, 3))::toJs()::should().deep.equal([1, 2, 3]);
    });
  });

  describe('::repeat', function () {
    it('should work', function () {
      const foos = 'foo'::repeat();
      void [1, 2, 3]::zipmap(foos)
        .toString()::should().equal('{1 "foo", 2 "foo", 3 "foo"}');
    });
    it('should also work', function () {
      // only two repeats
      const foos = 'foo'::repeat(2);
      void [1, 2, 3]::zipmap(foos)
        .toString()::should().equal('{1 "foo", 2 "foo"}');
    });
  });

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

describe('mori helpers', function () {
  describe('::isOdd', function () {
    it('should tell us that odd numbers are odd', function () {
      const check = b => b::should().be.true;
      mori.vector(3::isOdd(), 7::isOdd(), 9::isOdd())::each(check);
    });
    it('should tell us that even numbers are not odd', function () {
      const check = b => b::should().be.false;
      mori.vector(2::isOdd(), 4::isOdd(), 8::isOdd())::each(check);
    });
  });

  describe('::pipeline', function () {
    it('should thread a value through supplied functions', function () {
      // for some reason, I get this error when doing this
      // const {vector, $conj} = mori;
      // ```
      // TypeError: Cannot read property 'i' of undefined
      // at W._variadic (C:/Users/Administrator/Documents/mori-ext/src/mori-ext.js:34:21)
      // ```
      const {vector, conj} = mori; // eslint-disable-line no-shadow
      const result = vector(1, 2, 3)::pipeline(
        conj::curry(4),
        conj::curry(5)
      );

      result::toJs()::should().deep.equal([1, 2, 3, 4, 5]);
    });

    it('threading primitive values? No problem', function () {
      const target = 9;
      const {range, inc} = mori; // eslint-disable-line no-shadow
      const ops = range(target)::zipmap(inc::repeat())::vals()::toJs();
      const num = 0::pipeline(...ops);
      num::should().equal(target);
    });
  });

  describe('::', function () {
    it('should ', function () {
    });
  });
});
