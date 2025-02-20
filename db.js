require('dotevn').config();
const mysql = require('mysql2');

const fs = require('fs');
const dotenv = require('dotenv');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(process.env.DB_CA)
    }   
});

db.connect((err) => {
    if (err) {
        console.error("error connecting: ", err);
        return;
    } else {
        console.log('Connected to database');
    }
});

module.exports = db;