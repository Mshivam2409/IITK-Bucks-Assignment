const fs = require("fs");
const readline = require("readline");
const utf8 = require("../containers/utf8");
const int32 = require("../containers/int32");
const int64 = require('../containers/int64')

module.exports = class Output {
  constructor(noOfcoins = "0", lenPubKey="0", pubKey="0") {
    this.noOfcoins = noOfcoins;
    this.lenPubKey = lenPubKey;
    this.pubKey = pubKey;
    this.buffer = Buffer.alloc(0);
    return this
  }

  async createOutputfromUser() {
    var pubKeypath;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of coins ", (answer) => {
          this.noOfcoins = answer.toString();
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the path of public key ", (answer) => {
          pubKeypath = answer.toString();
          resolve();
        });
      });
    };

    await question1();
    await question2();
    rl.close();
    try {
      const data = fs.readFileSync(pubKeypath, "utf8");
      this.pubKey = data.toString();
      this.lenPubKey = data.length.toString();
    } catch (err) {
      console.error(err);
    }
    await this.updateBuffer();
  }

  async updateBuffer(){
    var BuffList = []
    BuffList.push(int64.toBuffer(this.noOfcoins))
    BuffList.push(int32.toBuffer(this.lenPubKey))
    BuffList.push(utf8.toBuffer(this.pubKey))
    this.buffer = Buffer.concat(BuffList)
  }

  toBuffer(){
    return this.buffer
  }

  async print(){
    console.log("\t\tNumber of Coins :",this.noOfcoins);
    console.log("\t\tLength of Public Key :",this.lenPubKey);
    console.log("\t\tPublic Key :",this.pubKey)
  }
};

