// Here we will contain logic to communicate with the PostgreSQL database
const Pool = require("pg").Pool;


const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "kitthornton",
    schema: "test"
});

module.exports = pool;
