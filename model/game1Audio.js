const mongoose = require('mongoose');
const game1AudioSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Audio: { type: String, required: true },

});
module.exports = mongoose.model('game1Audio', game1AudioSchema);