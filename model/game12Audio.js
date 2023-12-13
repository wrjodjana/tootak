const mongoose = required("mongoose");
const game12AudioSchema = mongoose.schmea({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  initialPromptAudio: { type: String, required: true },
  lastPromptAudio: { type: String, required: true },
});
module.exports = mongoose.model("game12Asset", game12AudioSchema);
