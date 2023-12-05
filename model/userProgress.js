const mongoose = require('mongoose');
const userProgressSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    uid: { type: String, required: true },
    Letters: { type: Array, default: [] }
});
module.exports = mongoose.model('userProgress', userProgressSchema);