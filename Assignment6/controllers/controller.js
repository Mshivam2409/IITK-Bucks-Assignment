const axios = require("axios");
const peers = require("../peers.json");

var array = {};

const add = async (req, res, next) => {
  const key = req.body.key;
  const value = req.body.value;
  if (!(key in array)) {
    array[key] = value;
    console.log("Set {", key, ":", value, "} on localhost");
    for (url in peers) {
      await axios
        .post(peers[url] + "/add", {
          key: key,
          value: value,
        })
        .then((res) => {
          console.log("Set {", key, ":", value, "} on", peers[url]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    res.end("Added Successfully!");
  } else {
    res.end("Key already exists!");
  }
};

const list = async (req, res, next) => {
  res.json(array);
};

exports.add = add;
exports.list = list;
