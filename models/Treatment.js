const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  description: String,
  _doctor: Schema.Types.ObjectId,
  _patient: Schema.Types.ObjectId
});

const Treatment = mongoose.model("Treatment", treatmentSchema);
module.exports = Treatment;
