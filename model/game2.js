const mongoose = require('mongoose');
const game2AssetSchema = mongoose.Schema({
    Name : {type : String, required: true},
    Category : {type: String, required: true},
    Module : {type: String, required: true},
    Image1 : {type: String, required: true},
    Image2 : {type: String, required: true},
    Audio : {type: String, required: true},
})

module.exports = mongoose.model('game2Data', game2AssetSchema);