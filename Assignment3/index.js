const Transaction = require("./classes/transaction");
const fs = require("fs");

const main = async () =>{
  const newTransac = new Transaction;
  await newTransac.createTransactionfromUser()
  // console.log(newTransac)
  // newTransac.print().then().catch(err => console.log(err))
  var filePath = "./bin/" + newTransac.transactionId + ".dat";

  fs.closeSync(fs.openSync(filePath, "w"));
  var wstream = fs.createWriteStream(filePath);
  wstream.write(newTransac.toBuffer());
  wstream.end();
}

main()
