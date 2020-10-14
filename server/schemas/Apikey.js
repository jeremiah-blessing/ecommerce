const mongoose = require("mongoose");

// Schemas
const APIKeysSchema = new mongoose.Schema({
  key: String,
  created: Date,
  disabled: Boolean,
});

// Models

const APIKey = mongoose.model("APIKey", APIKeysSchema);

module.exports = {
  APIKey,
};
