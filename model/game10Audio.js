const mongoose = require("mongoose");
const game10AudioSchema = mongoose.Schema({
  name: { type: String, required: true },

  // story audio
  storyAudio1: { type: String, required: true },
  storyAudio2: { type: String, required: true },
  storyAudio3: { type: String, required: true },
  storyAudio4: { type: String, required: true },

  // prompt
  promptAudio: { type: String, required: true },
});
