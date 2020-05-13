const int256toBytes = (str) => {
  var bignum = require("bignum");
  var num = bignum(str, (base = 16));
  var int32buffer = num.toBuffer({
    endian: "big",
    size: 32 ,
  });
  return int32buffer;
};

exports.int256toBytes = int256toBytes;
