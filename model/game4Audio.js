const mongoose = require('mongoose');
const game4AudioSchema = mongoose.Schema({
    Name : {type: String, required: true},
    InitialPrompt: { type: String, required: true },
    LetterSound: { type: String, required: true },
    LastPrompt: { type: String, required: true },
})
module.exports = mongoose.model('game4Audio', game4AudioSchema);