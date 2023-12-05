const mongoose = require("mongoose");

const frameSchema = mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String, required: true }, // URL or path to the image file
  audio: { type: String, required: true }, // URL or path to the audio file
});

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  frames: [frameSchema],
  // Additional metadata like author, publication date, etc., can be added here
});

module.exports = mongoose.model("Book", bookSchema);
