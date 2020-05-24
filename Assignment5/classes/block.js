const readline = require("readline");
const int32 = require("../containers/int32");
const int64 = require("../containers/int64");
const hex = require("../containers/hex");
const crypto = require("crypto");
const now = require("nano-time");
const bignum = require("bignum");
const fs = require("fs");

module.exports = class Block {
  constructor(
    index = Buffer.alloc(0),
    parentHash = Buffer.alloc(0),
    bodyHash = Buffer.alloc(0),
    target = Buffer.alloc(0),
    timestamp = Buffer.alloc(0),
    nonce = Buffer.alloc(0),
    bodyBuffer = Buffer.alloc(0)
  ) {
    this.index = index;
    this.parentHash = parentHash;
    this.bodyHash = bodyHash;
    this.target = target;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.body = bodyBuffer;
    this.targetString = "";
  }

  async createBlockfromBodyBuffer() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    var path;

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question(
          "Enter the path of binary file containing body data:  ",
          (answer) => {
            path = answer;
            resolve();
          }
        );
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the index :", (answer) => {
          this.index = int32.toBuffer(answer.toString());
          resolve();
        });
      });
    };

    const question3 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the parent hash:  ", (answer) => {
          this.parentHash = hex.toBuffer(answer.toString());
          resolve();
        });
      });
    };

    const question4 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the target value:  ", (answer) => {
            this.targetString = answer.toString()
          this.target = hex.toBuffer(answer.toString());
          resolve();
        });
      });
    };

    await question1();
    await question2();
    await question3();
    await question4();
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
    this.body = buffer;

    var hash = crypto.createHash("sha256");
    var hash_update = hash.update(this.body, "binary");
    var generated_hash = hash_update.digest("hex");
    this.bodyHash = hex.toBuffer(generated_hash.toString());
  }

  async generateNonce() {
    var index = bignum("0");
    var targetNum = bignum.fromBuffer(this.target);
    while (true) {
      var blockArray = [];
      blockArray.push(this.index);
      blockArray.push(this.parentHash);
      blockArray.push(this.bodyHash);
      blockArray.push(this.target);
      this.timestamp = int64.toBuffer(now());
      blockArray.push(this.timestamp);
      blockArray.push(
        index.toBuffer({
          endian: "big",
          size: 8 /*8-byte / 64-bit*/,
        })
      );
      blockArray.push(this.body);
      var buffer = Buffer.concat(blockArray);
      var hash = crypto.createHash("sha256");
      var hash_update = hash.update(buffer, "binary");
      var generated_hash = hash_update.digest("hex");
      var blockHash = hex.toBuffer(generated_hash.toString());
      var blockHashNum = bignum.fromBuffer(blockHash);
      if (generated_hash.toString()<this.targetString) {
        this.nonce = index.toBuffer({
          endian: "big",
          size: 8 /*8-byte / 64-bit*/,
        });
        console.log(index.toString(),generated_hash.toString(),bignum.fromBuffer(this.timestamp));
        break;
      } else {
        console.log(index.toString(),generated_hash.toString(),targetNum.toString(16));
        index = bignum.add(index, bignum("1"));
      }
    }
  }
};
