const express=require("express");
const router=express.Router();

const {Product}=require('../Models/glasses');
const {ObjectId}=require("mongodb");
router.get("/", (req, res) => {
    Product.find({
            category: "Lenses"
        })
        .then(
            (allLen) => {
                res.status(200).send(allLen);
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
            category: "Lenses"
        })
        .then(
            (lens) => {
                if (!lens) {
                    return res.status(404).send();
                }
                res.status(200).send(lens);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        );
});


module.exports = router;