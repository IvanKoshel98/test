const {Schema, model} = require('mongoose');

const userSchema = Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {
    timestamps: false,
    versionKey: false
})

const User = model('user', userSchema)

module.exports = User