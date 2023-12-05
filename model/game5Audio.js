const mongoose = require('mongoose');
const game5AudioSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Audio: { type: String, required: true },

});
module.exports = mongoose.model('game5Audio', game5AudioSchema);