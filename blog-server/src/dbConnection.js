const MongoClient = require("mongodb").MongoClient;
const url = process.env.DATABASE_URL;

const dbService = {
  db: undefined,
  connect: (callback) => {
    MongoClient.connect(
      url,
      {
        useUnifiedTopology: true,
      },
      function (err, data) {
        if (err) {
          MongoClient.close();
          callback(err);
        }
        dbService.db = data.db("ProductsDatabase");
        callback(null);
      }
    );
  },
};

module.exports = dbService;
