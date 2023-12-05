const mongoose = require('mongoose');
const game1ImagesSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Images: { type: Array, default: [] },
    CenterImage: { type: String, required: true },
    BottomText: { type: String, required: true }

});
module.exports = mongoose.model('game1Images', game1ImagesSchema);