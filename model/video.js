const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    video: { type: String, required: true },
    Letter: { type: String, required: true },

    Module: { type: String, required: true }

});
module.exports = mongoose.model('video', videoSchema);