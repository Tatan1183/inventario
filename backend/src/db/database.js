import mysql from "mysql2/promise";

import config from "./../config.js";

const connection = mysql.createConnection({
    host : config.host,
    database : config.database,
    user : config.user,
    password : config.password,
    port: config.port
})

const getConnection = ()=>{
    return connection
}

export default getConnection;