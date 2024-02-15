const mongoose = require("mongoose");
const game15Schema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialAudioPrompt: { type: String, required: true },
  finalAudioPrompt: { type: String, required: true},

  level1: {
    level1Image: String,
    level1CorrectOption: {
      text: String,
      audio: String,
    },
    level1Option1: {
      text: String,
      audio: String,
    },
    level1Option2: {
      text: String,
      audio: String,
    }
  },

  level2: {
    level2Image: String,
    level2CorrectOption: {
      text: String,
      audio: String,
    },
    level2Option1: {
      text: String,
      audio: String,
    },
    level2Option2: {
      text: String,
      audio: String,
    }
  },

  level3: {
    level3Image: String,
    level3CorrectOption: {
      text: String,
      audio: String,
    },
    level3Option1: {
      text: String,
      audio: String,
    },
    level3Option2: {
      text: String,
      audio: String,
    }
  },

});

module.exports = mongoose.model("game15", game15Schema);