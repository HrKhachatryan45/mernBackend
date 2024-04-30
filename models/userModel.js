const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        required: true,
        type: String,
    },
    email:{
        unique:true,
        required: true,
        type: String,
    },
    password:{
        required: true,
        type: String,
    },
    movies: [{
        type:Object,
        ref: 'Movie'
    }]
},{timestamps: true});


module.exports = mongoose.model('users',userSchema)




