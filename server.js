const app = require('./app');
const port = 3000;

var mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql2594',
    database: 'dental'
});

app.listen(port, () => {
    console.log(`app started at port ${port}`);
});