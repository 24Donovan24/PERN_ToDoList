const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "24donovan24",
    host: "localhost",
    port: 5433,
    database: "jwttutorial"
});

module.exports = pool;