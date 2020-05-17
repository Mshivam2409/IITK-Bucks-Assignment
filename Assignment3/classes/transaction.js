const Input = require("./input");
const Output = require("./output");
const readline = require("readline");
const crypto = require("crypto");
const intString = require("../generators/int");
const hexString = require("../generators/hexString");
const utf8String = require("../generators/utf8String");
const int32 = require('../containers/int32')

module.exports = class Transaction {
  constructor(numInput = 0, numOutput = 0) {
    this.transactionId = "";
    this.numInput = numInput;
    this.numOutput = numOutput;
    this.inputs = [];
    this.outputs = [];
    this.bufferList = [];
    this.buffer = Buffer.alloc(0);
  }

  async addInput(transactionId, index, signature) {
    const newInput = new Input(
      transactionId,
      index,
      signature.length.toString(),
      signature
    );
    this.inputs.push(newInput);
  }

  async addOutput(noofcoins, keydata) {
    const newInput = new Output(noofcoins, keydata.length.toString(), keydata);
    this.outputs.push(newInput);
  }

  async createTransactionfromUser() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    var numInput=0, numOutput=0;

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of inputs :", (answer) => {
          numInput = answer;
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of outputs :", (answer) => {
          numOutput = answer;
          resolve();
        });
      });
    };
    await question1();
    await question2();
    rl.close();
    this.bufferList = [];
    this.bufferList.push(int32.toBuffer(numInput.toString()))
    for (var i = 0; i < numInput; i++) {
      const newInput = new Input();
      await newInput.createInputfromUser();
      this.inputs.push(newInput);
      this.bufferList.push(newInput.buffer)
    }
    this.bufferList.push(int32.toBuffer(numOutput.toString()))
    for (var i = 0; i < numOutput; i++) {
      const newOutput = new Output();
      await newOutput.createOutputfromUser();
      this.outputs.push(newOutput);
      this.bufferList.push(newOutput.buffer);
    }

    this.buffer = Buffer.concat(this.bufferList)
    this.numInput = parseInt(numInput)
    this.numOutput = parseInt(numOutput)
    await this.updateTransactionId();
  }

  async createTransactionfromBuffer(BUff) {
    this.buffer = Buff;
    this.bufferList = [];
    this.bufferList.push(Buff);
    var hash = crypto.createHash("sha256");
    var hash_update = hash.update(Buff, "binary");
    var generated_hash = hash_update.digest("hex");
    this.transactionId = generated_hash.toString();
    var index = 0;
    const numInputStr = intString.fromBuffer(Buff.slice(index, index + 4));
    index = index + 4;
    const numInput = parseInt(numInputStr);
    this.numInput = numInput;
    for (let i = 1; i <= numInput; i++) {
      const newInput = new Input();
      newInput.transactionId = hexString.fromBuffer(
        buff.slice(index, index + 32)
      );
      index = index + 32;
      newInput.index = intString.fromBuffer(Buff.slice(index, index + 4));
      index = index + 4;
      newInput.lenSign = intString.fromBuffer(Buff.slice(index, index + 4))
      const lenSign = parseInt(newInput.lenSign)
      index = index + 4;
      newInput.signature = hexString.fromBuffer(Buff.slice(index, index + (lenSign)))
      index = index + (lenSign);
      this.inputs.push(newInput)
    }
    const numOutputStr = int.fromBuffer(Buff.slice(index, index + 4));
    index = index + 4;
    const numOutput = parseInt(numOutputStr);
    this.numOutput = numOutput
    for (let i = 1; i <= numOutput; i++) {
      const newOutput = new Output();
      newOutput.noOfcoins = intString.fromBuffer(Buff.slice(index,index+8))
      index = index + 8;
      newOutput.lenPubKey = intString.fromBuffer(Buff.slice(index,index+4))
      const lenKey = parseInt(newOutput.lenPubKey);
      index = index + 4;
      newOutput.pubKey = utf8String.fromBuffer(Buff.slice(index, index + lenKey))
      index = index + lenKey;
      this.outputs.push(newOutput)
    }
  }
  toBuffer() {
    return this.buffer;
  }
  async updateTransactionId() {
    var hash = crypto.createHash("sha256");
    var hash_update = hash.update(this.buffer, "binary");
    var generated_hash = hash_update.digest("hex");
    this.transactionId = generated_hash.toString();
  }
  async print() {
    console.log("Transaction Id :",this.transactionId);
    console.log("\tNumber of Inputs :",this.inputs.length);
    for (let index = 0; index < this.inputs.length; index++) {
      await this.inputs[index].print(); 
    }
    console.log("\tNumber of Outputs :",this.numOutput);
    for (let index = 0; index < this.outputs.length; index++) {
      await this.outputs[index].print(); 
    }
  }
};

