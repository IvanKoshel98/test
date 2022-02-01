const {User, Article, Comment} = require('../models')
const {usersData, articlesData, commentsData} = require('../dbFiller')


const finAuthorArticlesById = async (req, res) => {
    let result =await Article.aggregate(
        [
            {
                '$match': {
                    'author_id': 8
                }
            }, {
            '$lookup': {
                'from': 'users',
                'let': {
                    'id': '$author_id'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id', '$$id'
                                ]
                            }
                        }
                    }
                ],
                'as': 'user'
            }
        }, {
            '$lookup': {
                'from': 'comments',
                'let': {
                    'article_id': '$_id'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$article_id', '$$article_id'
                                ]
                            }
                        }
                    }
                ],
                'as': 'commentsArr'
            }
        }, {
            '$unwind': '$user'
        }, {
            '$project': {
                'title': 1,
                'author': '$user.name',
                'text': 1,
                'comments': {
                    '$cond': {
                        'if': {
                            '$isArray': '$commentsArr'
                        },
                        'then': {
                            '$size': '$commentsArr'
                        },
                        'else': 'no comments'
                    }
                }
            }
        }
        ]
    )
    res.json(result).status(200)
    return result
}

const articleIdByCommentText=async (req,res)=>{
    const result=await Comment.aggregate([
        {
            '$match': {
                'comment': new RegExp('vulputate')
            }
        }, {
            '$project': {
                'article_id': 1,
                'comment': 1
            }
        }
    ])
    res.json(result).status(200)
    return result
}

const deleteArticlesAndCommentsByAuthor=async (req,res)=>{
    const authorId= await User.findOne({email:'habitant.morbi@protonmail.edu'})
    await Article.deleteMany({author_id: authorId})
    await Comment.deleteMany({author_id: authorId})
}

const mostActiveUser=async (req,res)=>{
    const activeUser=await User.aggregate([
        {
            '$lookup': {
                'from': 'comments',
                'let': {
                    'user_id': '$_id'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$author_id', '$$user_id'
                                ]
                            }
                        }
                    }
                ],
                'as': 'commentsArr'
            }
        }, {
            '$lookup': {
                'from': 'articles',
                'let': {
                    'user_id': '$_id'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$author_id', '$$user_id'
                                ]
                            }
                        }
                    }
                ],
                'as': 'articlesArr'
            }
        }, {
            '$project': {
                'name': 1,
                'email': 1,
                'comments': {
                    '$size': '$commentsArr'
                },
                'articles': {
                    '$size': '$articlesArr'
                }
            }
        }, {
            '$addFields': {
                'activity': {
                    '$sum': [
                        '$comments', '$articles'
                    ]
                }
            }
        }, {
            '$sort': {
                'activity': -1
            }
        }, {
            '$limit': 1
        }
    ])

    res.json(activeUser).status(200)
    return activeUser
}

const dbFiller = async (req, res) => {
    await User.insertMany(usersData).then(() => console.log('Users Created and fill'))
    await Article.insertMany(articlesData).then(() => console.log('Article Created and fill'));
    await Comment.insertMany(commentsData).then(() => console.log('Comment Created and fill'));
}

module.exports = {
    finAuthorArticlesById,
    articleIdByCommentText,
    deleteArticlesAndCommentsByAuthor,
    mostActiveUser
}

