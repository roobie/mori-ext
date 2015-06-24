'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mori = require('mori');

var _mori2 = _interopRequireDefault(_mori);

var equals = function equals(other) {
  return _mori2['default'].equals(this, other);
};

exports.equals = equals;
var hash = function hash() {
  return _mori2['default'].hash(this);
};
exports.hash = hash;