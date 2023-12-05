const mongoose = require('mongoose');
const pharsiNameSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    ImageName: { type: String, required: true },

    Text: { type: String, required: true },

});
module.exports = mongoose.model('pharsiName', pharsiNameSchema);