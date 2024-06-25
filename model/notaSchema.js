const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },

  tag: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
