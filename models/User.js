const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    birthDate: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "admin"],
      default: "patient"
    },
    _treatment: {
      type: Schema.Types.ObjectId,
      ref: "treatment"
    },
    docKey: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
