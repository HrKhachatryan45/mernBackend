const mongoose = require('mongoose')


const Schema = mongoose.Schema

const movieSchema = new Schema({
    movieItem:{
        type:Object,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true});


module.exports = mongoose.model('movie',movieSchema);

