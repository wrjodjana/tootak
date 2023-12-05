const sortingGameSchema = mongoose.Schema({
  instructions: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image URLs or paths
  order: [{ type: Number, required: true }], // Correct order of images
  startAudio: { type: String, required: true }, // URL or path to the instruction audio
});

module.exports = mongoose.model("SortingGame", sortingGameSchema);
