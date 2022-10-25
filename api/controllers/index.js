const Plant = require("../models/plant.model");


const getAll = (req, res) => {
    Plant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const create = (req, res) => {

    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const plant = new Plant({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        isSold: req.body.isSold,
        suns: req.body.suns,
        water: req.body.water,
        id_category: req.body.id_category
    });

    Plant.create(plant, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Plant."
            });
        } else {
            res.send(data);
        }
    });
}


const remove = (req, res) => {
    Plant.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const removeAll = (req, res) => {
    Plant.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}


const updateById = (req, res) => {
    Plant.updateById(req.body, req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

const findById = (req, res) => {
    Plant.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error"
            });
        } else {
            res.send(data);
        }
    });
}

module.exports = {
    getAll,
    create,
    updateById,
    findById,
    remove,
    removeAll
}