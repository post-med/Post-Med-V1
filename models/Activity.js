const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  class: {
    type: String,
    required: true,
    enum: ["medication", "doctor", "course", "work"]
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  mapsLocation: {
    type: String
  },
  _treatment: Schema.Types.ObjectId
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
