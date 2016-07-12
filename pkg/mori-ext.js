'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJs = exports.toClj = exports.fnil = exports.curry = exports.partial = exports.pipeline = exports.knit = exports.juxt = exports.comp = exports.isOdd = exports.isEven = exports.sum = exports.dec = exports.inc = exports.constantly = exports.identity = exports.primSeq = exports.groupBy = exports.partitionBy = exports.partition = exports.repeatedly = exports.repeat = exports.iterate = exports.interleave = exports.interpose = exports.sortBy = exports.sort = exports.every = exports.some = exports.dropWhile = exports.drop = exports.takeWhile = exports.take = exports.reduceKV = exports.reduce = exports.remove = exports.filter = exports.mapcat = exports.map = exports.each = exports.intoArray = exports.flatten = exports.concat = exports.cons = exports.seq = exports.rest = exports.first = exports.isSuperset = exports.isSubset = exports.difference = exports.intersection = exports.union = exports.disj = exports.merge = exports.vals = exports.keys = exports.subvec = exports.reverse = exports.zipmap = exports.pop = exports.peek = exports.isEmpty = exports.count = exports.updateIn = exports.assocIn = exports.last = exports.nth = exports.find = exports.hasKey = exports.getIn = exports.get = exports.empty = exports.distinct = exports.dissoc = exports.assoc = exports.into = exports.conj = exports.isReversible = exports.isSeqable = exports.isReduceable = exports.isIndexed = exports.isCounted = exports.isAssociative = exports.isSequential = exports.isCollection = exports.isSet = exports.isMap = exports.isVector = exports.isSeq = exports.isList = exports.hash = exports.equals = undefined;

var _mori = require('mori');

var _mori2 = _interopRequireDefault(_mori);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal Helpers
var unaryFunc = function unaryFunc(name) {
  return function _unary() {
    return _mori2.default[name](this);
  };
};
var binaryFunc = function binaryFunc(name, rev) {
  return rev ? function _binaryRev(p) {
    return _mori2.default[name](p, this);
  } : function _binary(p) {
    return _mori2.default[name](this, p);
  };
};
var ternaryFunc = function ternaryFunc(name, rev) {
  return rev ? function _ternaryRev(a, b) {
    return _mori2.default[name](a, b, this);
  } : function _ternary(a, b) {
    return _mori2.default[name](this, a, b);
  };
};

var variadicFunc = function variadicFunc(name, rev) {
  return rev ? function _variadicRev() {
    return _mori2.default[name].apply(_mori2.default, Array.prototype.slice.call(arguments).concat([this]));
  } : function _variadic() {
    return _mori2.default[name].apply(_mori2.default, [this].concat(Array.prototype.slice.call(arguments)));
  };
};

// Fundamentals
var equals = exports.equals = binaryFunc('equals');
var hash = exports.hash = unaryFunc('hash');
// --

// Type Predicates
var isList = exports.isList = unaryFunc('isList');
var isSeq = exports.isSeq = unaryFunc('isSeq');
var isVector = exports.isVector = unaryFunc('isVector');
var isMap = exports.isMap = unaryFunc('isMap');
var isSet = exports.isSet = unaryFunc('isSet');
var isCollection = exports.isCollection = unaryFunc('isCollection');
var isSequential = exports.isSequential = unaryFunc('isSequential');
var isAssociative = exports.isAssociative = unaryFunc('isAssociative');
var isCounted = exports.isCounted = unaryFunc('isCounted');
var isIndexed = exports.isIndexed = unaryFunc('isIndexed');
var isReduceable = exports.isReduceable = unaryFunc('isReduceable');
var isSeqable = exports.isSeqable = unaryFunc('isSeqable');
var isReversible = exports.isReversible = unaryFunc('isReversible');
// --

// Collections
// --

// Collection Operations
var conj = exports.conj = variadicFunc('conj');
var into = exports.into = binaryFunc('into');
var assoc = exports.assoc = variadicFunc('assoc');
var dissoc = exports.dissoc = variadicFunc('dissoc');
var distinct = exports.distinct = unaryFunc('distinct');
var empty = exports.empty = unaryFunc('empty');
var get = exports.get = ternaryFunc('get');
var getIn = exports.getIn = ternaryFunc('getIn');
var hasKey = exports.hasKey = binaryFunc('hasKey');
var find = exports.find = binaryFunc('find');
var nth = exports.nth = binaryFunc('nth');
var last = exports.last = unaryFunc('last');
var assocIn = exports.assocIn = ternaryFunc('assocIn');
var updateIn = exports.updateIn = ternaryFunc('updateIn');
var count = exports.count = unaryFunc('count');
var isEmpty = exports.isEmpty = unaryFunc('isEmpty');
var peek = exports.peek = unaryFunc('peek');
var pop = exports.pop = unaryFunc('pop');
var zipmap = exports.zipmap = binaryFunc('zipmap');
var reverse = exports.reverse = unaryFunc('reverse');
// --

// Vector Operations
var subvec = exports.subvec = ternaryFunc('subvec');
// --

// Hash Map Operations
var keys = exports.keys = unaryFunc('keys');
var vals = exports.vals = unaryFunc('vals');
var merge = exports.merge = variadicFunc('merge');
// --

// Set Operations
var disj = exports.disj = binaryFunc('disj');
var union = exports.union = variadicFunc('union');
var intersection = exports.intersection = variadicFunc('intersection');
var difference = exports.difference = variadicFunc('difference');
var isSubset = exports.isSubset = binaryFunc('isSubset');
var isSuperset = exports.isSuperset = binaryFunc('isSuperset');
// --

// Sequences
var first = exports.first = unaryFunc('first');
var rest = exports.rest = unaryFunc('rest');
var seq = exports.seq = unaryFunc('seq');

// val first
// 1::cons(mori.vector(2, 3))
var cons = exports.cons = binaryFunc('cons');

// function first
// mori.range(3)::concat([3, 4, 5])
var concat = exports.concat = variadicFunc('concat');

var flatten = exports.flatten = unaryFunc('flatten');
var intoArray = exports.intoArray = unaryFunc('intoArray');
var each = exports.each = binaryFunc('each');

// function first
// mori.inc::map([0, 1, 2]) // => (1, 2, 3)
var map = exports.map = variadicFunc('map');

// function first
// ((x, y) => mori.list(x, x + y))::mapcat(mori.seq('abc'), mori.seq('123'));
var mapcat = exports.mapcat = variadicFunc('mapcat');

var filter = exports.filter = binaryFunc('filter', true);
var remove = exports.remove = binaryFunc('remove', true);

// function first -> special
var reduce = exports.reduce = function reduce(func, initial) {
  return _mori2.default.reduce(func, initial, this);
};

// function first
var reduceKV = exports.reduceKV = function reduceKV(func, initial) {
  return _mori2.default.reduceKV(func, initial, this);
};

var take = exports.take = binaryFunc('take', true);
var takeWhile = exports.takeWhile = binaryFunc('takeWhile', true);
var drop = exports.drop = binaryFunc('drop', true);
var dropWhile = exports.dropWhile = binaryFunc('dropWhile', true);
var some = exports.some = binaryFunc('some', true);
var every = exports.every = binaryFunc('every', true);

// optional function first
var sort = exports.sort = function sort(cmp) {
  return cmp ? _mori2.default.sort(cmp, this) : _mori2.default.sort(this);
};

// function first, optional second parameter, coll
var sortBy = exports.sortBy = function sortBy(keyFn, cmp) {
  return cmp ? _mori2.default.sortBy(keyFn, cmp, this) : _mori2.default.sortBy(keyFn, this);
};
var interpose = exports.interpose = binaryFunc('interpose', true);
var interleave = exports.interleave = variadicFunc('interleave');

// function first
var iterate = exports.iterate = binaryFunc('iterate');

// val first, first param optional
// since first param is optional, we have to do it differently
// 'foo'::repeat() // mori.repeat('foo', void)
// 'foo'::repeat(5) // mori.repeat(5, 'foo')
var repeat = exports.repeat = function mrepeat(p) {
  return p ? _mori2.default.repeat(p, this) : _mori2.default.repeat(this);
};

// function first, first param optional
// since first param is optional, we have to do it differently
var repeatedly = exports.repeatedly = function mrepeatedly(p) {
  return p ? _mori2.default.repeatedly(p, this) : _mori2.default.repeatedly(this);
};

var partition = exports.partition = variadicFunc('partition', true);
var partitionBy = exports.partitionBy = binaryFunc('partitionBy', true);
var groupBy = exports.groupBy = binaryFunc('groupBy', true);
// --

// Helpers
var primSeq = exports.primSeq = variadicFunc('primSeq');
var identity = exports.identity = unaryFunc('identity');
var constantly = exports.constantly = unaryFunc('constantly');
var inc = exports.inc = unaryFunc('inc');
var dec = exports.dec = unaryFunc('dec');
var sum = exports.sum = binaryFunc('sum');
var isEven = exports.isEven = unaryFunc('isEven');
var isOdd = exports.isOdd = unaryFunc('isOdd');
var comp = exports.comp = binaryFunc('comp');
var juxt = exports.juxt = variadicFunc('juxt');
var knit = exports.knit = variadicFunc('knit');
var pipeline = exports.pipeline = variadicFunc('pipeline');
var partial = exports.partial = variadicFunc('partial');
var curry = exports.curry = variadicFunc('curry');
var fnil = exports.fnil = ternaryFunc('fnil');
var toClj = exports.toClj = unaryFunc('toClj');
var toJs = exports.toJs = unaryFunc('toJs');
// --