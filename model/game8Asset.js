const mongoose = require("mongoose");
const game8AssetSchema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },
  incompleteWordImage: { type: String, required: true },
  completeWordImage: { type: String, required: true },
  correctOptionImageIndependentState: { type: String, required: true },
  correctOptionImageAttachedState: { type: String, required: true },
  option1Image: { type: String, required: true },
  option2Image: { type: String, required: true },
  option3Image: { type: String, required: true },
  gif: { type: String, required: true },
});
module.exports = mongoose.model("game8Asset", game8AssetSchema);
