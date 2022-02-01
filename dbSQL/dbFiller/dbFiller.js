const users = require('./usersData')
const articles = require('./aticlesData')
const comments = require('./commentsData')
const db = require('../models')

const dbFiller = async () => {

    for (const {id, name, email} of users) {
        await db.User.create({
            id, name, email,
        })
    }
    for (const {id, title, text, author_id} of articles) {
        await db.Article.create({
            id, title, text, author_id
        })
    }
    for (const {id, article_id, author_id, comment} of comments) {
        await db.Comment.create({
            id, article_id, author_id, comment
        })
    }

}
dbFiller();


