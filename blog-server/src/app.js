require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const bodyParser = require("body-parser");
const app = express();
const morganOptions = NODE_ENV === "production" ? "tiny" : "common";
const MongoClient = require("mongodb").MongoClient;

// app middleware
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const url = process.env.DATABASE_URL;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//get request
app.get("/api/blogThemes", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbase = db.db("ProductsDatabase");
    dbase
      .collection("ProductsData")
      .find()
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results[0].blogThemes);
        db.close();
      });
  });
});

// get user info
app.get("/api/user", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbase = db.db("ProductsDatabase");
    dbase
      .collection("ProductsData")
      .find()
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results[0].user);
        db.close();
      });
  });
});

// put requests
app.put("/api/blogThemes", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbase = db.db("ProductsDatabase");
    dbase
      .collection("ProductsData")
      .findOneAndUpdate(
        { "blogThemes.id": req.body.id },
        { $set: { "blogThemes.$.favorited": req.body.favorited } },
        (err, response) => {
          if (err) console.log(err);
          res.send("updated");
          db.close();
        }
      );
  });
});
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
