const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keySchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  _doctor: Schema.Types.ObjectId
});

const Key = mongoose.model("Key", keySchema);
module.exports = Key;
