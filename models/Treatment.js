const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
  patientID: {
    type: Schema.Types.ObjectId,
    ref: "patient"
  },
  duration: {
    type: Number
  },
  plan: [Object]
});

const Treatment = mongoose.model("Treatment", treatmentSchema);
module.exports = Treatment;
