const express = require("express");
const bodyParser = require("body-parser");
const { Worker } = require("worker_threads");

var result = {};
const app = express();

app.use(bodyParser.json());

app.post("/start", (req, res, next) => {
  start();
  res.status(200).json({ message: "Starting Mining" });
});

app.get("/result", (req, res, next) => {
  res.status(200).json(result);
});

const start = () => {
  const worker = new Worker("./miner/index.js");
  worker.on("message", (msg) => {
    result = msg;
    console.log(msg);
  });
  worker.on("error", (err) => {
    console.log(err);
  });
  worker.on("exit", (code) => {
    console.log(code);
  });
};

app.listen(3492, () => {
  console.log("Listening on port 3492");
});
