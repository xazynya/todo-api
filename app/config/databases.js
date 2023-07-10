const mysql = require('mysql');

const database = () => {
    const connection = mysql.createConnection({
        host: `${process.env.MYSQL_HOST}`,
        user: `${process.env.MYSQL_USER}`,
        password: `${process.env.MYSQL_PASSWORD}`,
        database: `${process.env.MYSQL_DATABASE}`
    });
    return connection
}

exports.database = database;