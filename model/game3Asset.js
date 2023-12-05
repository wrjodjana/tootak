const mongoose = require('mongoose');
const game3AssetSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Images: { type: Array, default: [] },
    //Text: { type: String, required: true },
    Text1: {type: String, required: true},
    Text2: {type: String, required: true},  // new added by K
    Letter: { type: String, required: true },

});

module.exports = mongoose.model('game3Data', game3AssetSchema);