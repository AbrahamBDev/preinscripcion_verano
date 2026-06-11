const mariadb = require("mariadb"); // Obtenemos el modulo de mariadb; el cual es el conector ofical para conectarnos a la base de datos
require("dotenv").config();

const pool = mariadb.createPool({
    host : "localhost",
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    connectionLimit : 5
}
);

module.exports = pool;