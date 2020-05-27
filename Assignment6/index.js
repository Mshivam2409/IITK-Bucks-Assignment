const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const cont = require("./controllers/controller")

app.use(bodyParser.json());

app.post("/add", cont.add);
app.get("/list", cont.list);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(3492);
