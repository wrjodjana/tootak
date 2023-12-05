const mongoose = require('mongoose');
const game8AudioSchema = mongoose.Schema({
    name : {type: String, required : true},
    module : {type: Number, required : true},
    completeWordAudio : {type: String, required : true},
    correctOptionAudio : {type: String, required : true},
    option1Audio : {type : String, required : true},
    option2Audio : {type : String, required : true},
    option3Audio : {type : String, required : true},
    promptAudio1 : {type: String, required : true},
    promptAudio2 : {type : String, required : true}
});
module.exports = mongoose.model('game8Audio', game8AudioSchema);