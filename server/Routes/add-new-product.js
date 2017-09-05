const express=require("express");
const router=express.Router();
const _=require("lodash");

const {Product}=require('../Models/glasses');


router.post("/", (req, res) => {

    const body = _.pick(req.body, ["name", "model_no", "category", "price", "seller", "images", "sizes"]);

    const newProduct = new Product(body);
    newProduct.save()
        .then(
            () => {
                res.status(200).send(newProduct);

            }
        )
        .catch(
            (e) => {
                res.status(400).send();
            }
        );

});

module.exports = router;