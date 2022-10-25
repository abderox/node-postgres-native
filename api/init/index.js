const { getClient } = require("../config");


const createCategoryTable = async (sql) => {
    await sql.query(`CREATE TABLE IF NOT EXISTS Category(
        id BIGSERIAL PRIMARY KEY NOT NULL ,
        name varchar,
        date TIMESTAMP NOT NULL DEFAULT current_timestamp
      );`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("created categories table");
    });
}

const createPlantTable = async (sql) => {
    await sql.query(`CREATE TABLE IF NOT EXISTS Plants (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR ,
        description VARCHAR ,
        price DOUBLE PRECISION ,
        image VARCHAR ,
        isSold BOOLEAN ,
        suns SMALLINT ,
        water SMALLINT ,
        date TIMESTAMP NOT NULL DEFAULT current_timestamp,
        id_category INT REFERENCES Category(id)
        
    );`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("created plants table");
    });
}



const init = async () => {
    const sql = await getClient();
    await createCategoryTable(sql);
    await createPlantTable(sql);
}


module.exports = init;
