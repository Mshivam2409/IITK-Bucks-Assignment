module.exports = class Input {
  constructor(transactionId, index, lenSign, signature) {
    this.transactionId = transactionId;
    this.index = index;
    this.lenSign = lenSign;
    this.signature = signature;
  }
};
