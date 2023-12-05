const mongoose = require('mongoose');
const gameThumbnailSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Scenario: { type: String, required: true },
    ThumbnailImage: { type: String, required: true },
    Game: { type: String, required: true },
    Type: { type: String, required: true },
    Module: { type: String, required: true },
    Letter: { type: String, required: true }

});
module.exports = mongoose.model('gameThumbnail', gameThumbnailSchema);