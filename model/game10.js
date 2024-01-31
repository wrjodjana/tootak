const mongoose = require('mongoose');
const game10Schema = mongoose.Schema({
    name : {type: String, required: true},
    module : {type: Number, required: true},
    bookCoverImage : String,
    bookTitle : String,
    bookTitleAudio : String,
    story : {
        populated : {type : Boolean, default : false},
        images : {type: Array, default: []},
        audios : {type: Array, default: []},
        texts : {type: Array, default: []}
    },
    audioPromptBeforeGameStarts : String,
    game1 : {
        populated : {type : Boolean, default : false},  // populated or exists ?
        initialAudioPrompt : String,
        images :  {type: Array, default: []},
        audios : {type: Array, default: []}
    },
    game2 : {
        populated : {type : Boolean, default : false},
        initialAudioPrompt : String,
        image :  String,
        correctOption : {
            text : String,
            audio : String
        },
        option1 : {
            text : String,
            audio : String
        },
        option2 : {
            text : String,
            audio : String
        }
        /*
        correctOptionText : String,
        correctOptionAudio : String,
        option1Text :  String,
        option1Audio : String,
        option2Text :  String,
        option2Audio : String
        */
    },
    game3: {
        populated : {type : Boolean, default : false},
        initialAudioPrompt : String,
        correctOption1: {
            image : String,
            audio : String,
            text : String
        },
        correctOption2: {
            image : String,
            audio : String,
            text : String
        },
        option1: {
            image : String,
            audio : String,
            text : String
        },
        option2: {
            image : String,
            audio : String,
            text : String
        }
        /*
        correctOption1Image :  String,
        correctOption1Text :  String,
        correctOption1Audio : String,
        correctOption2Image :  String,
        correctOption2Text :  String,
        correctOption2Audio : String,
        option1Image :  String,
        option1Text :  String,
        option1Audio : String,
        option2Image :  String,
        option2Text :  String,
        option2Audio : String
        */
    }

    /*
    name : {type: String, required: true},
    module : {type: Number, required: true},
    bookCoverImage : {type: String, required: true},
    bookTitle : {type: String, required: true},
    story : {
        images : {type: Array, default: []},
        audios : {type: Array, default: []},
        texts : {type: Array, default: []}
    },
    audioPromptBeforeGameStarts : {type: String, required: true},
    game1 : {
        initialAudioPrompt : {type: String, required: true},
        images :  {type: Array, default: []},
        audios : {type: Array, default: []}
    },
    game2 : {
        initialAudioPrompt : {type: String, required: true},
        image :  {type: String, required: true},
        correctOptionText :  {type: String, required: true},
        correctOptionAudio : {type: String, required: true},
        option1Text :  {type: String, required: true},
        option1Audio : {type: String, required: true},
        option2Text :  {type: String, required: true},
        option2Audio : {type: String, required: true}
    },
    game3: {
        initialAudioPrompt : {type: String, required: true},
        correctOption1Image :  {type: String, required: true},
        correctOption1Text :  {type: String, required: true},
        correctOption1Audio : {type: String, required: true},
        correctOption2Image :  {type: String, required: true},
        correctOption2Text :  {type: String, required: true},
        correctOption2Audio : {type: String, required: true},
        option1Image :  {type: String, required: true},
        option1Text :  {type: String, required: true},
        option1Audio : {type: String, required: true},
        option2Image :  {type: String, required: true},
        option2Text :  {type: String, required: true},
        option2Audio : {type: String, required: true}
    }
    */

});
module.exports = mongoose.model('game10', game10Schema);