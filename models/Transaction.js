const { Schema, model } = require('mongoose')

const now = new Date().getTime()
const TransactionSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        default: now,
    },
})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction
