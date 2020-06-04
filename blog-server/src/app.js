require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config/config");
const bodyParser = require("body-parser");
const app = express();
const morganOptions = NODE_ENV === "production" ? "tiny" : "common";
const blogThemeRouter = require('./router/blogThemeRouter');

// app middleware
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(blogThemeRouter);


// handles errors
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
