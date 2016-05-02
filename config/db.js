'use strict';

var mysql = require('mysql');

var db = mysql.createConnection(process.env.JAWSDB_URL || {
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'moviez'
});

db.connect();

db.query('CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTO_INCREMENT, imdbId VARCHAR(20), name VARCHAR(100), posterUrl TEXT, favorite BOOLEAN, seen BOOLEAN, rating TINYINT)');

module.exports = db;