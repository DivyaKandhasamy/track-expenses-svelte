const { Schema, model } = require('mongoose')

const now = new Date().getTime()
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = model('user', UserSchema)

module.exports = User
