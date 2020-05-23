require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config')
const bodyParser = require("body-parser");
const ProductsData = require("../ProductsData")

const app = express();

const morganOptions = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogThemes", (req, res) => {
  const blogThemes = ProductsData.blogThemes;
  res.json(blogThemes)
});

app.put("/api/blogThemes", (req, res) => {
  console.log(req.body)
  res.send('POST request to the homepage')
})

app.get("/api/users", (req, res) => {
  const blogThemes = ProductsData.users;
  res.json(blogThemes)
});

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
