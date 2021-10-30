const mongoose = require("mongoose");
const readingSchema = new mongoose.Schema({
  field1: String,
  field2: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Reading", readingSchema);
