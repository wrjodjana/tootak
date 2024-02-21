const mongoose = require("mongoose");
const game16Schema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialAudioPrompt: String,
  finalAudioPrompt: String,
  transitionAudioPrompt: String,

  level1: {
    level1CorrectOption1: {
      image: String,
      audio: String,
      text: String,
    },
    level1CorrectOption2: {
      image: String,
      audio: String,
      text: String,
    },
    level1Option1: {
      image: String,
      audio: String,
      text: String,
    },
    level1Option2: {
      image: String,
      audio: String,
      text: String,
    },
  },

  level2: {
    level2CorrectOption1: {
      image: String,
      audio: String,
      text: String,
    },
    level2CorrectOption2: {
      image: String,
      audio: String,
      text: String,
    },
    level2Option1: {
      image: String,
      audio: String,
      text: String,
    },
    level2Option2: {
      image: String,
      audio: String,
      text: String,
    },
  },

  level3: {
    level3CorrectOption1: {
      image: String,
      audio: String,
      text: String,
    },
    level3CorrectOption2: {
      image: String,
      audio: String,
      text: String,
    },
    level3Option1: {
      image: String,
      audio: String,
      text: String,
    },
    level3Option2: {
      image: String,
      audio: String,
      text: String,
    },
  },
});

module.exports = mongoose.model("game16", game16Schema);
