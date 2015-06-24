import mori from 'mori';

export const equals = function (other) {
  return mori.equals(this, other);
};

export const hash = function () {
  return mori.hash(this);
};
