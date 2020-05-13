const String2Byte = (str) => {
  var utf8 = unescape(encodeURIComponent(str));
  var arr = [];
  for (var i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }
  return Buffer.from(arr);
};

exports.String2Byte = String2Byte;
