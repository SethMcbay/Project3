const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const UserWine= new Schema({
    name: String,
    region: String,
    type: String,
    year: Number,
    rating: Number,
    description: String
})


module.exports = mongoose.model('UserWine', UserWine)