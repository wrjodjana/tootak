const mongoose = require("mongoose");
const game16AssetSchema = mongoose.Schema({
  name: { type: String, required: true },
  module: { type: Number, required: true },

  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, require: true },
  image4: { type: String, required: true },
});
module.exports = mongoose.model("game16Asset", game16AssetSchema);
