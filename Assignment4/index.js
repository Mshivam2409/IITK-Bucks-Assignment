const Input = require("./classes/input");
const Output = require("./classes/output");
const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");
const bignum = require("bignum");
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

  const toInt = (buffer) => {
    return bignum.fromBuffer(buffer).toString();
  };

  const toHex = (buffer) => {
    return buffer.toString("hex");
  };

  const toUtf8 = (buf) => {
    return buf.toString("utf8");
  };
  const buffer = await readfile();

  const ByteArraytoTranscation = async (Buff) => {
    var hash = crypto.createHash("sha256");
    hash_update = hash.update(Buff, "binary");
    generated_hash = hash_update.digest("hex");
    console.log("Transaction Id :",generated_hash);
    var index = 0;
    const numInputStr = toInt(Buff.slice(index, index + 4));
    index = index + 4;
    console.log("Number of Inputs :", numInputStr);
    const numInput = parseInt(numInputStr);
    for (let i = 1; i <= numInput; i++) {
      console.log("\t Input", i);
      console.log(
        "\t\t Transaction Id :",
        toHex(Buff.slice(index, index + 32))
      );
      index = index + 32;
      console.log("\t\t Index :", toInt(Buff.slice(index, index + 4)));
      index = index + 4;
      console.log(
        "\t\t Length of the Signature : ",
        toInt(Buff.slice(index, index + 4))
      );
      const lenSign = parseInt(toInt(Buff.slice(index, index + 4)));
      index = index + 4;
      console.log(
        "\t\t Signature :",
        toUtf8(Buff.slice(index, index + lenSign))
      );
      index = index + lenSign;
    }
    const numOutputStr = toInt(Buff.slice(index, index + 4));
    index = index + 4;
    console.log("Number of Outputs :", numOutputStr);
    const numOutput = parseInt(numOutputStr);
    for (let i = 1; i <= numOutput; i++) {
      console.log("\t Output", i);
      console.log(
        "\t\t Number of Coins :",
        toInt(Buff.slice(index, index + 8))
      );
      index = index + 8;
      console.log(
        "\t\t Length of Public Key :",
        toInt(Buff.slice(index, index + 4))
      );
      const lenKey = parseInt(toInt(Buff.slice(index, index + 4)));
      index = index + 4;
      console.log(
        "\t\t Public Key :",
        toUtf8(Buff.slice(index, index + lenKey))
      );
      index = index + lenKey;
    }
  };
  await ByteArraytoTranscation(buffer);
};

main();
