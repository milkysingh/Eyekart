const express=require("express");
const router=express.Router();

const {Product}=require('../Models/glasses');
const {ObjectId}=require("mongodb");
router.get("/", (req, res) => {
    let counter = 0;
    if (req.query.count !== undefined) {
        counter = parseInt(req.query.count);
    }
    Product.find({
            category: "Lenses"
        })
        .limit(4)
        .skip(counter)
        .then(
            (allLen) => {
                res.status(200).send(allLen);
            }
        )
        .catch(
            (err) => {

                res.status(400).send(err);
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