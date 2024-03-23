const express = require("express");
const cors = require("cors");
const router = require("./Routes/index.js");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
morgan.token("custom-date", (req, res) => {
  return new Date().toUTCString();
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);
console.log(morgan);
app.use(router);

module.exports = app;
