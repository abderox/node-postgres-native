const express = require("express");
const router = express.Router();

const { getAll,
    create,
    updateById,
    findById } = require("../controllers");


router.get("/", getAll);
router.post("/", create);
router.put("/:id", updateById);
router.get("/:id", findById);


module.exports = router;