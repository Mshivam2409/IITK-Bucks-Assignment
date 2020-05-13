const Transac = require("./classes/transaction");
const num32 = require("./containers/int32");
const num64 = require("./containers/int64");
const strbin = require("./containers/utf8");
const crypto = require("crypto");
const int256 = require('./containers/int256')
const fs = require("fs");

const main = async () => {
  const transactions = await Transac.createTransaction();

  var list = [];
  var flist = [];
  var buf1 = num32.numto32(transactions.inputs.length.toString());
  list.push(buf1);
  for (var i = 0; i < transactions.inputs.length; i++) {
    var buf2 = int256.int256toBytes(transactions.inputs[i][`transactionId`]);
    var buf3 = num32.numto32(transactions.inputs[i][`index`]);
    var buf4 = num32.numto32(transactions.inputs[i][`lenSign`]);
    var buf5 = strbin.String2Byte(transactions.inputs[i][`signature`]);
    list.push(buf2, buf3, buf4, buf5);
  }
  var buf6 = num32.numto32(transactions.outputs.length.toString());
  list.push(buf6);
  for (var i = 0; i < transactions.outputs.length; i++) {
    var buf7 = num64.numto64(transactions.outputs[i][`noOfcoins`]);
    var buf8 = num32.numto32(transactions.outputs[i][`lenPubKey`]);
    var buf9 = strbin.String2Byte(transactions.outputs[i][`pubKey`]);
    list.push(buf7, buf8, buf9);
  }
  var newbuff = Buffer.concat(list);
  var hash = crypto.createHash("sha256");
  hash_update = hash.update(newbuff, "binary");
  generated_hash = hash_update.digest("hex");
  transactions.transactionId = generated_hash;
  var buf10 = int256.int256toBytes(transactions.transcationId);
  flist.push(buf10, newbuff);
  var fbuff = Buffer.concat(flist);
  console.log(transactions);
  console.log(fbuff);

  var filePath = "./bin/" + generated_hash + ".dat";

  fs.closeSync(fs.openSync(filePath, "w"));
  var wstream = fs.createWriteStream(filePath);
  wstream.write(fbuff);
  wstream.end();
};

main();
