const express = require("express");
const bodyParser = require("body-parser");
var hash = require("hash.js");

const target = 0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

const server = express();

server.use(bodyParser.json({ type: "application/json" }));

server.post("/hash", (req, res, next) => {
  console.log(req.body.data);
  var index,ans;
  for ( index = 1; index>=0; index++) {
    ans = hash.sha256().update(req.body.data+index).digest("hex");
    if(parseInt(ans,16)<=target){
        break;
    }
  }
  console.log(req.body.data+index);
  res.json(JSON.parse(JSON.stringify({ hash: req.body.data + index })));
});

server.listen(8787);
