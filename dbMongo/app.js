const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const {    finAuthorArticlesById,
    articleIdByCommentText,
    deleteArticlesAndCommentsByAuthor,
    mostActiveUser
}=require('./Queries/queries')
require("dotenv").config()

const {
    DB_MONGO_HOST,
    PORT=3000
} = process.env

const app = express();
app.use(cors());

app.get('/',(req,res)=>
    articleIdByCommentText(req,res)
)


mongoose.connect(DB_MONGO_HOST)
    .then(() => {
        console.log('MongoDB connect success')
        app.listen(PORT)
    })
    .catch(err => {
        console.log('Connecting error - \n', err.message)
        process.exit(1)
    })