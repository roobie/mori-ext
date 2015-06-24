# mori-ext
[Function bind syntax](https://github.com/zenparsing/es-function-bind) wrappers for [mori](http://swannodette.github.io/mori)


#### Quick example
```javascript
const v1 = mori.vector('foo', 'bar', 'baz');
const v2 = v1::assoc(1, 'quux');
const v3 = mori.vector('foo', 'quux', 'baz');
v2::equals(v3); // => true
```

## How?
Using [babeljs](https://babeljs.io/) everyone can use this syntax.

[Look at an example using gulp](https://github.com/roobie/mori-ext/blob/master/gulpfile.js#L28-L32)

## Usage

[Review the spec](https://github.com/roobie/mori-ext/blob/master/spec/basic.js) (the spec is as of this moment not complete, but it's on its way)

# API
`mori-ext`'s  API is mostly based on collections being the first argument to `mori` functions, i.e.

```javascript
import mori from 'mori';
import { isList } from 'mori-ext';

const coll = mori.vector(1, 2, 3);

mori.isList(coll);
// is equivalent to
coll::isList();

// and

mori.equals(coll1, coll2);
// is equivalent to
coll1::equals(coll2);
```

However, not all functions operate on a single collection, or even, on collections at all, so some consideration has been taken into account, e.g.

```javascript
// mapcat
((x, y) => mori.list(x, x + y))
  ::mapcat(mori.seq('abc'), mori.seq('123'));
// => ('a' 'a1' 'b' 'b2' 'c' 'c3')

// cons (converts collection into seq)
1::cons(mori.vector(2, 3))
// => (1 2 3)
```

## Exported values
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
