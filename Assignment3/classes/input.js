const readline = require("readline");
const hex = require("../containers/hex");
const int32 = require("../containers/int32");

module.exports = class Input {
  constructor(transactionId, index, lenSign, signature) {
    this.transactionId = transactionId;
    this.index = index;
    this.lenSign = lenSign;
    this.signature = signature;
    this.buffer = Buffer.alloc(0);
  }
  async createInputfromUser() {
    var BuffList = [];
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the transaction id ", (answer) => {
          this.transactionId = answer.toString();
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the index ", (answer) => {
          this.index = answer.toString();
          resolve();
        });
      });
    };

    const question3 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the signature ", (answer) => {
          this.signature = answer.toString();
          this.lenSign = (parseInt(this.signature.length.toString()) / 2).toString();
          resolve();
        });
      });
    };
    await question1();
    await question2();
    await question3();
    rl.close();
    await this.updateBuffer();
  }

  async updateBuffer(buffer) {
    var BuffList = [];
    BuffList.push(hex.toBuffer(this.transactionId));
    BuffList.push(int32.toBuffer(this.index));
    BuffList.push(int32.toBuffer(this.lenSign));
    BuffList.push(hex.toBuffer(this.signature));
    this.buffer = Buffer.concat(BuffList);
  }

  async toBuffer() {
    return this.buffer;
  }

  async print() {
    console.log("\t\t Transaction Id :", this.transactionId);
    console.log("\t\t Index :", this.index);
    console.log("\t\t Length of Signature = ", this.lenSign);
    console.log("\t\t Signature :", this.signature);
  }
};
