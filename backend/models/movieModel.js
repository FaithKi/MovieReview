// const mongoose = require('mongoose')
import mongoose from 'mongoose';

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

export default mongoose.model('Movie', movieSchema)