const db = require('../config/db').pool
const getArticlesByAuthorId = async (id) => {
    const getArticles = await
        db.query(`select A.id,
                         title,
                         U.name                                                         as author,
                         text,
                         (select count(id) from "Comments" C where C.article_id = A.id) as comments
                  from "Articles" A
                           inner join "Users" U on U.id = A.author_id
                  where A.author_id = $1`, [id])
    return getArticles.rows;
}

const mostActiveAuthor = async () => {
    const getActiveAuthor =
        await db.query(`SELECT "Users".*,
                               COUNT("Articles".id)             as article_count,
                               (SELECT COUNT(C.id)
                                From "Comments" C
                                WHERE C.author_id = U.id) as comments_count
                        FROM Users U
                                 JOIN "Articles" A On A.author_id = U.id
                        GROUP BY U.id
                        ORDER BY(comments_count + COUNT(A.id)) DESC`)
    return getActiveAuthor.rows;

}


const getArticlesIdByWordInComment = async (word) => {
    const getArticlesId = await
        db.query(`select article_id, comment
                  from "Comments"
                  where comment like $1;`, [`%${word}%`])
    return getArticlesId.rows;
}

const deleteArticlesAndCommentsByUserEmail = async (email) => {
    await db.query(
        `delete
         from "Comments"
         where author_id = (select id from "Users" where email = $1)
        `, [email])
        .then(console.log(`Deleted`))
        .catch(error => console.log('Error', error))
    await db.query(
        `delete
         from "Article"
         where author_id = (select id from "Users" where email = $1)
        `, [email])
        .then(console.log(`Deleted`))
        .catch(error => console.log('Error', error))
    // add cascad delete tables

    return null;
}

getArticlesByAuthorId(8).then((data => console.table(data)))
mostActiveAuthor().then((data => console.table(data)))
getArticlesIdByWordInComment('vulputate').then((data => console.table(data)))
deleteArticlesAndCommentsByUserEmail('habitant.morbi@protonmail.ed')

