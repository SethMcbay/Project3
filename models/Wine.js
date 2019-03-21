const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Wine = new Schema({
    name: String,
    vintner: String,
    type: String,
    year: Date,
    rating: Number
})


module.exports = mongoose.model('Wine', Wine)