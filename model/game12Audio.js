const mongoose = require("mongoose");
const game12AudioSchema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialPromptAudio: { type: String, required: true },
  lastPromptAudio: { type: String, required: true },
});
module.exports = mongoose.model("game12Audio", game12AudioSchema);
