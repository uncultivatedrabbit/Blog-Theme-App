const mongoose = require('mongoose');
const schema = {
  blogThemes: [
    {
      id: String,
      name: String,
      imageUrl: String,
      type: String,
      about: String,
      favorited: Boolean,
    },
  ],
  users: [
    {
      id: String,
      name: String,
      email: String,
    },
  ],
};
const collectionName = "ProductData";
const productSchema = mongoose.Schema(schema);
const Data = mongoose.model(collectionName, productSchema, collectionName)

module.exports = Data;
