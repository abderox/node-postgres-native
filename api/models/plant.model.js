const { getClient } = require("../config");
var sql = null;

(async () => {
    sql = await getClient();
})();

class Plant {


    constructor(plant) {
        this.id = plant.id;
        this.name = plant.name;
        this.description = plant.description;
        this.price = plant.price;
        this.image = plant.image;
        this.isSold = plant.isSold;
        this.suns = plant.suns;
        this.water = plant.water;
        this.id_category = plant.id_category;
    }

    static async create(newPlant, result) {
        await sql.query("INSERT INTO plants(name, description, price, image, isSold, suns, water, id_category) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
            [newPlant.name, newPlant.description, newPlant.price, newPlant.image, newPlant.isSold, newPlant.suns, newPlant.water, newPlant.id_category],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created plant: ", { id: res.insertId, ...newPlant });
                result(null, { id: res.insertId, ...newPlant });
            });
    }


    static async updateById(plant, id, result) {
        await sql.query(
            "UPDATE plants SET name = ?, description = ?, price = ?, image = ?, isSold = ?, suns = ?, water = ?, id_category = ? WHERE id = ?",
            [plant.name, plant.description, plant.price, plant.image, plant.isSold, plant.suns, plant.water, plant.id_category, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {

                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("updated plant: ", { id: id, ...plant });

                result(null, { id: id, ...plant });
            }
        );
    }
    static async findById(plantId, result) {
        await sql.query(`SELECT * FROM plants WHERE id = ${plantId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found plant: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
    }
    static async getAll(result) {
        await sql.query("SELECT * FROM plants", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("plants: ", res);
            result(null, res.rows);
        });
    }
    static async remove(id, result) {
        await sql.query("DELETE FROM plants WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("deleted plant with id: ", id);
            result(null, res);
        });
    }
    static async removeAll(result) {
        await sql.query("DELETE FROM plants", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`deleted ${res.affectedRows} plants`);
            result(null, res);
        });
    }
}


module.exports = Plant;






