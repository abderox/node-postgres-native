const {Client} = require('pg');
const dbConfig = require('./db.config.js');



module.exports.getClient = async () => {
    const sql = new Client({
        user: dbConfig.user,
        host: dbConfig.host,
        database: dbConfig.db,
        password: dbConfig.password,
        port: dbConfig.port,
    });
    await sql.connect();
    return sql;
  };

