const mongoose = require('mongoose');
const game4AssetSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Image: { type: String, required: true },
    ScratchImage: { type: String, required: true },
    Text: { type: String, required: true },
    Gif: { type: String, required: true },
    //promptAudio: { type: String, required: true },
});


module.exports = mongoose.model('game4Data', game4AssetSchema);