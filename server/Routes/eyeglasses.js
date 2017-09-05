const express = require("express");
const router = express.Router();

const { Product} = require('../Models/glasses');
const {ObjectId} = require("mongodb");

router.get("/", (req, res) => {
    Product.find({
            category: "Eyeglasses"
        })
        .then(
            (alleye) => {
                res.status(200).send(alleye);
            }
        )
        .catch(
            (err) => {
                res.send(400).send();
            }
        );
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Product.findOne({
            _id: id,
            category: "Eyeglasses"
        })
        .then(
            (eyeglass) => {
                if (!eyeglass) {
                    return res.status(404).send();
                }
                res.status(200).send(eyeglass);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        );
});

module.exports = router;