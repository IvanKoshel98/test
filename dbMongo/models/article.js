const {Schema, model} = require('mongoose');

const articleSchema = Schema({
    _id: Number,
    title: String,
    text: String,
    author_id: Number
},{
    timestamps: false,
    versionKey: false
})

const Article = model('article', articleSchema)

module.exports = Article