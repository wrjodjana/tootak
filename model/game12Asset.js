const mongoose = required("mongoose");
const game12AssetSchema = mongoose.schmea({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  backgroundImage: { type: String, required: true },
  wordImage: { type: String, required: true },
  gif: { type: String, required: true },
});
module.exports = mongoose.model("game12Asset", game12AssetSchema);
