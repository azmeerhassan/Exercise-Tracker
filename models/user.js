const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date},
})

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    log: [exerciseSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User
