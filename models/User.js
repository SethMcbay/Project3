const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    age: Number,
    wineprefernce: String,
    email: String,
    winecellar: [
        {type: Schema.Types.ObjectId,
         ref: 'UserWine'   
        
        }

    ]
})

module.exports = mongoose.model('User', User)