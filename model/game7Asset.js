const mongoose = require('mongoose');
const game7AssetSchema = mongoose.Schema({
    Name : {type : String, required : true},
    MainImages : {type: Array, default : []},
    //SideImages : {type: Array, default : []},
    CompleteImage : {type: String, required : true},
    Text1 : {type: String, required : true},
    Text2 : {type: String, required : true},
    Letter : {type: String, required : true}
});

module.exports = mongoose.model('game7Data', game7AssetSchema);
