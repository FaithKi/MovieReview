const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    title : {
        type: String,
        require: true
    },
    year : {
        type: Number
    },
    description : {
        type: String
    },
    ratings : {
        type: Number
    }
}, { timestamps:true })

module.exports = mongoose.model('Movie', movieSchema)