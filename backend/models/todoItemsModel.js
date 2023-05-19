const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid')


const TodoSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo