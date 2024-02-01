const mongoose = require("mongoose");
const game15Schema = mongoose.Schema({
    name: { type: String, required: true },
    module: { type: Number, required: true },
  
    initialAudioPrompt: String,
    finalAudioPrompt: String,
    image :  String,
  
    correctOption: {
      audio: String,
      text: String,
    },
    option1: {
      audio: String,
      text: String,
    },
    option2: {
      audio: String,
      text: String,
    },
  });
  
  module.exports = mongoose.model("game15", game15Schema);