const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const router = require("./router");

mongoose.connect(
  "mongodb://localhost:27017/auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  err =>
    err ? console.log("error occured") : console.log("connected to database")
);

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

router(app);

const port = process.env.PORT || 3090;

app.listen(port, () => console.log("server started on port:", port));
