const mongoose = require("mongoose");

const frameSchema = mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String, required: true }, // URL or path to the image file
  audio: { type: String, required: true }, // URL or path to the audio file
});

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  frames: [frameSchema],
});

module.exports = mongoose.model("Book", bookSchema);

// no need to add framing
// considerScenario (unique identifier)
// each of the four tables, one document each

// game 10 story
// name, 4 images,  4 audio, 4 texts, promptAudio

// game 10 sorting
// name, 4 images, 4 audio, 4 texts, promptAudio

// game 10 mcq
// name, 1 image, 3 text options (correctOption, option1, option2), 3 audio options (same as text), 1 option out of 3 correct, promptAudio

// game 10 match
// name, 4 images, 4 texts (correctOption1, correctOption2, option1, option2), 4 audios, promptAudio