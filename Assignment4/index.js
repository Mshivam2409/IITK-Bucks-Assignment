const readline = require("readline");
const fs = require("fs");
const Transaction = require('./classes/transaction')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const main = async () => {
  var path;
  const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question("Enter the path of binary file:  ", (answer) => {
        path = answer;
        resolve();
      });
    });
  };

  await question1();
  rl.close();

  const readfile = async () => {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(path, { highWaterMark: 16 });
      const data = [];
      readStream.on("data", (chunk) => {
        data.push(chunk);
        // console.log("data :", chunk, chunk.length);
      });

      readStream.on("end", () => {
        // console.log("end :", Buffer.concat(data));
        resolve(Buffer.concat(data));
        // end : I am transferring in bytes by bytes called chunk
      });

      readStream.on("error", (err) => {
        console.log("error :", err);
        reject();
      });
    });
  };
  const buffer = await readfile();
  const newTransac = new Transaction;
  await newTransac.createTransactionfromBuffer(buffer);
  await newTransac.print().then().catch(err => console.log(err))
};

main();
