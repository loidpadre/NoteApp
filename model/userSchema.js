const mongoose = require("mongoose");
const Notes = require("../model/notaSchema");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    require: true,
    minlength: 6,
  },
  notes: [Notes],
});

module.exports = mongoose.model("User", UserSchema);
