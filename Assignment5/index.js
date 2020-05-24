const Block = require("./classes/block")

const main = async () => {
    const newBlock = new Block();
    await newBlock.createBlockfromBodyBuffer();
    await newBlock.generateNonce();
}

main();