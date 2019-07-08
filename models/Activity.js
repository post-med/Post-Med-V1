const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  class: {
    type: String,
    enum: ["medication", "doctor", "course", "work"]
  },
  startTime: Date,
  endTime: Date,
  info: String,
  mapsLocation: String,
  _treatment: Schema.Types.ObjectId
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
