const bignum = require("bignum");

const fromBuffer = (buffer) => {
  return bignum.fromBuffer(buffer).toString();
};

exports.fromBuffer = fromBuffer;
