const {Schema, model} = require('mongoose');

const commentSchema = Schema({
    _id: Number,
    article_id: Number,
    author_id: Number,
    comment: String
},{
    timestamps: false,
    versionKey: false

})

const Comment = model('comment', commentSchema)

module.exports = Comment