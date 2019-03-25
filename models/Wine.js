const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Wine = new Schema({
    name: String,
    region: String,
    type: String,
    year: Number,
    rating: Number,
    description: String
})


module.exports = mongoose.model('Wine', Wine)