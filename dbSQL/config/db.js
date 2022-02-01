const Pool=require('pg').Pool
module.exports.pool=new Pool({
    "user": "postgres",
    "password": "root",
    "host": "localhost",
    "port":5432,
    "database": "test_nodejs"
})
