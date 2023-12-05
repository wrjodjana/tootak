const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Age: { type: String, required: true },
    Role : {type : String, default : "Viewer"}
});
module.exports = mongoose.model('user', userSchema);