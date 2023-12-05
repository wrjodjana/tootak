const choiceGameSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      image: { type: String, required: true },
      audio: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  feedbackAudio: {
    correct: { type: String, required: true },
    incorrect: { type: String, required: true },
  },
});

module.exports = mongoose.model("ChoiceGame", choiceGameSchema);
