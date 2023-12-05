const mongoose = require('mongoose');
const game3AudioSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Audio: { type: String, required: true },

});
module.exports = mongoose.model('game3Audio', game3AudioSchema);