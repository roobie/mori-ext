import mori from 'mori';

const unaryFunc = function (name) {
  return function unary() {
    return mori[name](this);
  };
};
const binaryFunc = function (name) {
  return function binary(p) {
    return mori[name](this, p);
  };
};

const variadicFunc = function (name) {
  return function variadic() {
    return mori[name](this, ...arguments);
  };
};

// Fundamentals
export const equals = binaryFunc('equals');
export const hash = unaryFunc('hash');

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

// Collections

// Collection Operations
export const conj = variadicFunc('conj');

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
