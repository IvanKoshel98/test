const{model}=require('mongoose')
const User=require('./user')
const Article=require('./article')
const Comment=require('./comment')


module.exports = {
    User,
    Article,
    Comment
}
