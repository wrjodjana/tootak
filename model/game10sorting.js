const sortingGameSchema = mongoose.Schema({
  instructions: { type: String, required: true },
  images: [{ type: String, required: true }],
  order: [{ type: Number, required: true }], 
  startAudio: { type: String, required: true }, 
});

module.exports = mongoose.model("SortingGame", sortingGameSchema);
