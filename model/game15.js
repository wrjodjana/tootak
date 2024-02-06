const mongoose = require("mongoose");
const game15Schema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialAudioPrompt: { type: String, required: true },
  finalAudioPrompt: { type: String, required: true},

  game1: {
    image: String,
    correctOption: {
      text: String,
      audio: String,
    },
    option1: {
      text: String,
      audio: String,
    },
    option2: {
      text: String,
      audio: String,
    },
  },

  game2: {
    image: String,
    correctOption: {
      text: String,
      audio: String,
    },
    option1: {
      text: String,
      audio: String,
    },
    option2: {
      text: String,
      audio: String,
    },
  },

  game3: {
    image: String,
    correctOption: {
      text: String,
      audio: String,
    },
    option1: {
      text: String,
      audio: String,
    },
    option2: {
      text: String,
      audio: String,
    },
  },

});

module.exports = mongoose.model("game15", game15Schema);
