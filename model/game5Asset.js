const mongoose = require('mongoose');
const game5AssetSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Images: { type: Array, default: [] },
    Text: { type: String, required: true },
    Gif: { type: String, required: true },
    CorrectImage: { type: String, required: true },
    Letter: { type: String, required: true }

});


module.exports = mongoose.model('game5Data', game5AssetSchema);