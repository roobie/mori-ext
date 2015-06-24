'use strict';

var _slice = require('babel-runtime/helpers/slice')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _mori = require('mori');

var _mori2 = _interopRequireDefault(_mori);

var unaryFunc = function unaryFunc(name) {
    return function unary() {
        return _mori2['default'][name](this);
    };
};
var binaryFunc = function binaryFunc(name) {
    return function binary(p) {
        return _mori2['default'][name](this, p);
    };
};

var variadicFunc = function variadicFunc(name) {
    return function variadic() {
        return _mori2['default'][name].apply(_mori2['default'], [this].concat(_slice.call(arguments)));
    };
};

// Fundamentals
var equals = binaryFunc('equals');
exports.equals = equals;
var hash = unaryFunc('hash');

exports.hash = hash;
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
// Collections

// Collection Operations
var conj = variadicFunc('conj');

/*
Fundamentals

    equals
    hash

Type Predicates

    isList
    isSeq
    isVector
    isMap
    isSet
    isCollection
    isSequential
    isAssociative
    isCounted
    isIndexed
    isReduceable
    isSeqable
    isReversible

Collections

    list
    vector
    hashMap
    set
    sortedSet
    range
    queue

Collection Operations

    conj
    into
    assoc
    dissoc
    distinct
    empty
    get
    getIn
    hasKey
    find
    nth
    last
    assocIn
    updateIn
    count
    isEmpty
    peek
    pop
    zipmap
    reverse

Vector Operations

    subvec

Hash Map Operations

    keys
    vals
    merge

Set Operations

    disj
    union
    intersection
    difference
    isSubset
    isSuperset

Sequences

    first
    rest
    seq
    cons
    concat
    flatten
    intoArray
    each
    map
    mapcat
    filter
    remove
    reduce
    reduceKV
    take
    takeWhile
    drop
    dropWhile
    some
    every
    sort
    sortBy
    interpose
    interleave
    iterate
    repeat
    repeatedly
    partition
    partitionBy
    groupBy

Helpers

    primSeq
    identity
    constantly
    inc
    dec
    sum
    isEven
    isOdd
    comp
    juxt
    knit
    pipeline
    partial
    curry
    fnil
    toClj
    toJs
*/
exports.conj = conj;