const mongoose = require("mongoose");
const Notes = require("../model/notaSchema");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
    minlength: 6,
  },
  notes: [Notes.schema],
  default: [],
});

module.exports = mongoose.model("User", UserSchema);
