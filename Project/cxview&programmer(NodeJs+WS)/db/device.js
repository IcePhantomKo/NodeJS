const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password:'ggat.123',
    database:'new_schema',
    // timezone: "08:00"
})

module.exports = db
