const mongoose = require("mongoose");
const game16Schema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialAudioPrompt: String,
  finalAudioPrompt: String,

  correctOption1: {
    image: String,
    audio: String,
    text: String,
  },
  correctOption2: {
    image: String,
    audio: String,
    text: String,
  },
  option1: {
    image: String,
    audio: String,
    text: String,
  },
  option2: {
    image: String,
    audio: String,
    text: String,
  },
});

module.exports = mongoose.model("game16", game16Schema);
