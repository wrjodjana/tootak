const mongoose = require('mongoose');
const game2AudioSchema = mongoose.Schema({
    Category : {type: String, required: true},
    Module: {type: String, required: true},
    PromptAudio1 : {type: String, required: true},
    PromptAudio2 : {type: String, required: true},
});
module.exports = mongoose.model('game2Audio', game2AudioSchema);