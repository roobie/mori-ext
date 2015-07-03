import mori from 'mori';

// Internal Helpers
const unaryFunc = function (name) {
  return function _unary() {
    return mori[name](this);
  };
};
const binaryFunc = function (name, rev) {
  return rev ?
  function _binaryRev(p) {
    return mori[name](p, this);
  } :
  function _binary(p) {
    return mori[name](this, p);
  };
};
const ternaryFunc = function (name, rev) {
  return rev ?
  function _ternaryRev(a, b) {
    return mori[name](a, b, this);
  } :
  function _ternary(a, b) {
    return mori[name](this, a, b);
  };
};

const variadicFunc = function (name, rev) {
  return rev ?
  function _variadicRev() {
    return mori[name](...arguments, this);
  } :
  function _variadic() {
    return mori[name](this, ...arguments);
  };
};

// Fundamentals
export const equals = binaryFunc('equals');
export const hash = unaryFunc('hash');
// --

// Type Predicates
export const isList = unaryFunc('isList');
export const isSeq = unaryFunc('isSeq');
export const isVector = unaryFunc('isVector');
export const isMap = unaryFunc('isMap');
export const isSet = unaryFunc('isSet');
export const isCollection = unaryFunc('isCollection');
export const isSequential = unaryFunc('isSequential');
export const isAssociative = unaryFunc('isAssociative');
export const isCounted = unaryFunc('isCounted');
export const isIndexed = unaryFunc('isIndexed');
export const isReduceable = unaryFunc('isReduceable');
export const isSeqable = unaryFunc('isSeqable');
export const isReversible = unaryFunc('isReversible');
// --

// Collections
// --

// Collection Operations
export const conj = variadicFunc('conj');
export const into = binaryFunc('into');
export const assoc = variadicFunc('assoc');
export const dissoc = variadicFunc('dissoc');
export const distinct = unaryFunc('distinct');
export const empty = unaryFunc('empty');
export const get = ternaryFunc('get');
export const getIn = ternaryFunc('getIn');
export const hasKey = binaryFunc('hasKey');
export const find = binaryFunc('find');
export const nth = binaryFunc('nth');
export const last = unaryFunc('last');
export const assocIn = ternaryFunc('assocIn');
export const updateIn = ternaryFunc('updateIn');
export const count = unaryFunc('count');
export const isEmpty = unaryFunc('isEmpty');
export const peek = unaryFunc('peek');
export const pop = unaryFunc('pop');
export const zipmap = binaryFunc('zipmap');
export const reverse = unaryFunc('reverse');
// --

// Vector Operations
export const subvec = ternaryFunc('subvec');
// --

// Hash Map Operations
export const keys = unaryFunc('keys');
export const vals = unaryFunc('vals');
export const merge = variadicFunc('merge');
// --

// Set Operations
export const disj = binaryFunc('disj');
export const union = variadicFunc('union');
export const intersection = variadicFunc('intersection');
export const difference = variadicFunc('difference');
export const isSubset = binaryFunc('isSubset');
export const isSuperset = binaryFunc('isSuperset');
// --

// Sequences
export const first = unaryFunc('first');
export const rest = unaryFunc('rest');
export const seq = unaryFunc('seq');

// val first
// 1::cons(mori.vector(2, 3))
export const cons = binaryFunc('cons');

// function first
// mori.range(3)::concat([3, 4, 5])
export const concat = variadicFunc('concat');

export const flatten = unaryFunc('flatten');
export const intoArray = unaryFunc('intoArray');
export const each = binaryFunc('each');

// function first
// mori.inc::map([0, 1, 2]) // => (1, 2, 3)
export const map = variadicFunc('map');

// function first
// ((x, y) => mori.list(x, x + y))::mapcat(mori.seq('abc'), mori.seq('123'));
export const mapcat = variadicFunc('mapcat');

export const filter = binaryFunc('filter', true);
export const remove = binaryFunc('remove', true);

// function first -> special
export const reduce = function reduce(func, initial) {
  return mori.reduce(func, initial, this);
};

// function first
export const reduceKV = function reduceKV(func, initial) {
  return mori.reduceKV(func, initial, this);
};

export const take = binaryFunc('take', true);
export const takeWhile = binaryFunc('takeWhile', true);
export const drop = binaryFunc('drop', true);
export const dropWhile = binaryFunc('dropWhile', true);
export const some = binaryFunc('some', true);
export const every = binaryFunc('every', true);

// function first
export const sort = binaryFunc('sort');

// function first
export const sortBy = ternaryFunc('sortBy');
export const interpose = binaryFunc('interpose', true);
export const interleave = variadicFunc('interleave');

// function first
export const iterate = binaryFunc('iterate');

// val first, first param optional
// since first param is optional, we have to do it differently
// 'foo'::repeat() // mori.repeat('foo', void)
// 'foo'::repeat(5) // mori.repeat(5, 'foo')
export const repeat = function mrepeat(p) {
  return p ? mori.repeat(p, this) : mori.repeat(this);
};

// function first, first param optional
// since first param is optional, we have to do it differently
export const repeatedly = function mrepeatedly(p) {
  return p ? mori.repeatedly(p, this) : mori.repeatedly(this);
};

export const partition = variadicFunc('partition', true);
export const partitionBy = binaryFunc('partitionBy', true);
export const groupBy = binaryFunc('groupBy', true);
// --

// Helpers
export const primSeq = variadicFunc('primSeq');
export const identity = unaryFunc('identity');
export const constantly = unaryFunc('constantly');
export const inc = unaryFunc('inc');
export const dec = unaryFunc('dec');
export const sum = binaryFunc('sum');
export const isEven = unaryFunc('isEven');
export const isOdd = unaryFunc('isOdd');
export const comp = binaryFunc('comp');
export const juxt = variadicFunc('juxt');
export const knit = variadicFunc('knit');
export const pipeline = variadicFunc('pipeline');
export const partial = variadicFunc('partial');
export const curry = variadicFunc('curry');
export const fnil = ternaryFunc('fnil');
export const toClj = unaryFunc('toClj');
export const toJs = unaryFunc('toJs');
// --
