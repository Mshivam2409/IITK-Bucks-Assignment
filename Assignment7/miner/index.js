const Block = require("./classes/block");
const { workerData, parentPort } = require("worker_threads");

const main = async () => {
  parentPort.postMessage({ result: "Not Found", nonce: -1 });
  const newBlock = new Block();
  const parentHash =
    "0000000000000000000000000000000000000000000000000000000000000000";
  const target =
    "f000000000000000000000000000000000000000000000000000000000000000";
  const index = "1";
  await newBlock.createBlockfromBodyBuffer(
    "./miner/bin/015.dat",
    index,
    parentHash,
    target
  );
  const nonce = await newBlock.generateNonce();
  console.log(nonce);
  parentPort.postMessage({ result: "Found", nonce: nonce });
};

main();
