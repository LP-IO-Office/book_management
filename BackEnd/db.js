require("dotenv").config();
const {Pool} = require("pg");
const pool = new Pool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    port: process.env.db_port,
});
module.exports = pool;