const mongoose = require("mongoose");
const game10AssetSchema = mongoose.Schema({
  name: { type: String, required: true },

  // story images
  storyImage1: { type: String, required: true },
  storyImage2: { type: String, required: true },
  storyImage3: { type: String, required: true },
  storyImage4: { type: String, required: true },

  // story texts
  storyText1: { type: String, required: true },
  storyText2: { type: String, required: true },
  storyText3: { type: String, required: true },
  storyText4: { type: String, required: true },
});
