const Input = require("./input");
const Output = require("./output");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
class Transaction {
  constructor(numInput, numOutput) {
    this.transcationId = 0x0;
    this.numInput = numInput;
    this.numInput = numOutput;
    this.inputs = [];
    this.outputs = [];
  }

  async addInput() {
    var transactionId, index, lenSign, signature;

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the transaction id ", (answer) => {
          transactionId = answer;
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the index ", (answer) => {
          index = answer;
          resolve();
        });
      });
    };

    const question3 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the signature ", (answer) => {
          signature = answer.toString();
          resolve();
        });
      });
    };
    await question1();
    await question2();
    await question3();

    lenSign = signature.length.toString();

    const input = new Input(transactionId, index, lenSign, signature);
    this.inputs.push(input);
  }

  async addOutput() {
    var noofcoins, lenPubKey, pubKey, keydata;

    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of coins ", (answer) => {
          noofcoins = answer;
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the path of public key ", (answer) => {
          pubKey = answer.toString();
          resolve();
        });
      });
    };

    await question1();
    await question2();

    try {
      const data = fs.readFileSync(pubKey, "utf8");
      keydata = data.toString();
      lenPubKey = data.length.toString();
    } catch (err) {
      console.error(err);
    }
    const output = new Output(noofcoins, lenPubKey, keydata);
    this.outputs.push(output);
  }
}

const createTransaction = async () => {
  var numInput, numOutput;
  const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question("Enter the number of inputs ", (answer) => {
        numInput = answer;
        resolve();
      });
    });
  };

  const question2 = () => {
    return new Promise((resolve, reject) => {
      rl.question("Enter the number of outputs ", (answer) => {
        numOutput = answer;
        resolve();
      });
    });
  };
  await question1();
  await question2();

  const transaction = new Transaction(numInput, numOutput);
  for (var i = 0; i < numInput; i++) {
    await transaction.addInput();
  }
  for (var i = 0; i < numOutput; i++) {
    await transaction.addOutput();
  }
  rl.close();
  return transaction;
};

exports.createTransaction = createTransaction;
