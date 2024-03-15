const mongoose = require("mongoose");
const game13Schema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },
  intiialAudioPrompt: { type: String, required: true },
  finalAudioPrompt: { type: String, required: true },
  finalSentence: { type: String, required: true },
  audios: { type: Array, default: [] },
  texts: { type: Array, default: [] },
});
module.exports = mongoose.model("game12Asset", game13Schema);
