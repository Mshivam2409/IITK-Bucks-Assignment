const numto32 = (str) => {
  var bignum = require("bignum");
  var num = bignum(str);
  var int32buffer = num.toBuffer({
    endian: "big",
    size: 4 /*8-byte / 64-bit*/,
  });
  return int32buffer;
};

exports.numto32 = numto32;
