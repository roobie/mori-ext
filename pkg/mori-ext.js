'use strict';

var _slice = require('babel-runtime/helpers/slice')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mori = require('mori');

var _mori2 = _interopRequireDefault(_mori);

// Internal Helpers
var unaryFunc = function unaryFunc(name) {
  return function _unary() {
    return _mori2['default'][name](this);
  };
};
var binaryFunc = function binaryFunc(name, rev) {
  return rev ? function _binaryRev(p) {
    return _mori2['default'][name](p, this);
  } : function _binary(p) {
    return _mori2['default'][name](this, p);
  };
};
var ternaryFunc = function ternaryFunc(name, rev) {
  return rev ? function _ternaryRev(a, b) {
    return _mori2['default'][name](a, b, this);
  } : function _ternary(a, b) {
    return _mori2['default'][name](this, a, b);
  };
};

var variadicFunc = function variadicFunc(name, rev) {
  return rev ? function _variadicRev() {
    return _mori2['default'][name].apply(_mori2['default'], _slice.call(arguments).concat([this]));
  } : function _variadic() {
    return _mori2['default'][name].apply(_mori2['default'], [this].concat(_slice.call(arguments)));
  };
};

// Fundamentals
var equals = binaryFunc('equals');
exports.equals = equals;
var hash = unaryFunc('hash');
exports.hash = hash;
// --

// Type Predicates
var isList = unaryFunc('isList');
exports.isList = isList;
var isSeq = unaryFunc('isSeq');
exports.isSeq = isSeq;
var isVector = unaryFunc('isVector');
exports.isVector = isVector;
var isMap = unaryFunc('isMap');
exports.isMap = isMap;
var isSet = unaryFunc('isSet');
exports.isSet = isSet;
var isCollection = unaryFunc('isCollection');
exports.isCollection = isCollection;
var isSequential = unaryFunc('isSequential');
exports.isSequential = isSequential;
var isAssociative = unaryFunc('isAssociative');
exports.isAssociative = isAssociative;
var isCounted = unaryFunc('isCounted');
exports.isCounted = isCounted;
var isIndexed = unaryFunc('isIndexed');
exports.isIndexed = isIndexed;
var isReduceable = unaryFunc('isReduceable');
exports.isReduceable = isReduceable;
var isSeqable = unaryFunc('isSeqable');
exports.isSeqable = isSeqable;
var isReversible = unaryFunc('isReversible');
exports.isReversible = isReversible;
// --

// Collections
// --

// Collection Operations
var conj = variadicFunc('conj');
exports.conj = conj;
var into = binaryFunc('into');
exports.into = into;
var assoc = variadicFunc('assoc');
exports.assoc = assoc;
var dissoc = variadicFunc('dissoc');
exports.dissoc = dissoc;
var distinct = unaryFunc('distinct');
exports.distinct = distinct;
var empty = unaryFunc('empty');
exports.empty = empty;
var get = ternaryFunc('get');
exports.get = get;
var getIn = ternaryFunc('getIn');
exports.getIn = getIn;
var hasKey = binaryFunc('hasKey');
exports.hasKey = hasKey;
var find = binaryFunc('find');
exports.find = find;
var nth = binaryFunc('nth');
exports.nth = nth;
var last = unaryFunc('last');
exports.last = last;
var assocIn = ternaryFunc('assocIn');
exports.assocIn = assocIn;
var updateIn = ternaryFunc('updateIn');
exports.updateIn = updateIn;
var count = unaryFunc('count');
exports.count = count;
var isEmpty = unaryFunc('isEmpty');
exports.isEmpty = isEmpty;
var peek = unaryFunc('peek');
exports.peek = peek;
var pop = unaryFunc('pop');
exports.pop = pop;
var zipmap = binaryFunc('zipmap');
exports.zipmap = zipmap;
var reverse = unaryFunc('reverse');
exports.reverse = reverse;
// --

// Vector Operations
var subvec = ternaryFunc('subvec');
exports.subvec = subvec;
// --

// Hash Map Operations
var keys = unaryFunc('keys');
exports.keys = keys;
var vals = unaryFunc('vals');
exports.vals = vals;
var merge = variadicFunc('merge');
exports.merge = merge;
// --

// Set Operations
var disj = binaryFunc('disj');
exports.disj = disj;
var union = variadicFunc('union');
exports.union = union;
var intersection = variadicFunc('intersection');
exports.intersection = intersection;
var difference = variadicFunc('difference');
exports.difference = difference;
var isSubset = binaryFunc('isSubset');
exports.isSubset = isSubset;
var isSuperset = binaryFunc('isSuperset');
exports.isSuperset = isSuperset;
// --

// Sequences
var first = unaryFunc('first');
exports.first = first;
var rest = unaryFunc('rest');
exports.rest = rest;
var seq = unaryFunc('seq');

exports.seq = seq;
// val first
// 1::cons(mori.vector(2, 3))
var cons = binaryFunc('cons');

exports.cons = cons;
// function first
// mori.range(3)::concat([3, 4, 5])
var concat = variadicFunc('concat');

exports.concat = concat;
var flatten = unaryFunc('flatten');
exports.flatten = flatten;
var intoArray = unaryFunc('intoArray');
exports.intoArray = intoArray;
var each = binaryFunc('each');

exports.each = each;
// function first
// mori.inc::map([0, 1, 2]) // => (1, 2, 3)
var map = variadicFunc('map');

exports.map = map;
// function first
// ((x, y) => mori.list(x, x + y))::mapcat(mori.seq('abc'), mori.seq('123'));
var mapcat = variadicFunc('mapcat');

exports.mapcat = mapcat;
var filter = binaryFunc('filter', true);
exports.filter = filter;
var remove = binaryFunc('remove', true);

exports.remove = remove;
// function first
var reduce = ternaryFunc('reduce', true);

exports.reduce = reduce;
// function first
var reduceKV = ternaryFunc('reduceKV', true);

exports.reduceKV = reduceKV;
var take = binaryFunc('take', true);
exports.take = take;
var takeWhile = binaryFunc('takeWhile', true);
exports.takeWhile = takeWhile;
var drop = binaryFunc('drop', true);
exports.drop = drop;
var dropWhile = binaryFunc('dropWhile', true);
exports.dropWhile = dropWhile;
var some = binaryFunc('some', true);
exports.some = some;
var every = binaryFunc('every', true);

exports.every = every;
// function first
var sort = binaryFunc('sort');

exports.sort = sort;
// function first
var sortBy = ternaryFunc('sortBy');
exports.sortBy = sortBy;
var interpose = binaryFunc('interpose', true);
exports.interpose = interpose;
var interleave = variadicFunc('interleave');

exports.interleave = interleave;
// function first
var iterate = binaryFunc('iterate');

exports.iterate = iterate;
// val first, first param optional
// since first param is optional, we have to do it differently
// 'foo'::repeat() // mori.repeat('foo', void)
// 'foo'::repeat(5) // mori.repeat(5, 'foo')
var repeat = function mrepeat(p) {
  return p ? _mori2['default'].repeat(p, this) : _mori2['default'].repeat(this);
};

exports.repeat = repeat;
// function first, first param optional
// since first param is optional, we have to do it differently
var repeatedly = function mrepeatedly(p) {
  return p ? _mori2['default'].repeatedly(p, this) : _mori2['default'].repeatedly(this);
};

exports.repeatedly = repeatedly;
var partition = variadicFunc('partition', true);
exports.partition = partition;
var partitionBy = binaryFunc('partitionBy', true);
exports.partitionBy = partitionBy;
var groupBy = binaryFunc('groupBy', true);
exports.groupBy = groupBy;
// --

// Helpers
var primSeq = variadicFunc('primSeq');
exports.primSeq = primSeq;
var identity = unaryFunc('identity');
exports.identity = identity;
var constantly = unaryFunc('constantly');
exports.constantly = constantly;
var inc = unaryFunc('inc');
exports.inc = inc;
var dec = unaryFunc('dec');
exports.dec = dec;
var sum = binaryFunc('sum');
exports.sum = sum;
var isEven = unaryFunc('isEven');
exports.isEven = isEven;
var isOdd = unaryFunc('isOdd');
exports.isOdd = isOdd;
var comp = binaryFunc('comp');
exports.comp = comp;
var juxt = variadicFunc('juxt');
exports.juxt = juxt;
var knit = variadicFunc('knit');
exports.knit = knit;
var pipeline = variadicFunc('pipeline');
exports.pipeline = pipeline;
var partial = variadicFunc('partial');
exports.partial = partial;
var curry = variadicFunc('curry');
exports.curry = curry;
var fnil = ternaryFunc('fnil');
exports.fnil = fnil;
var toClj = unaryFunc('toClj');
exports.toClj = toClj;
var toJs = unaryFunc('toJs');
// --
exports.toJs = toJs;