const express = require("express");
const router = express.Router();

const { Product} = require('../Models/glasses');
const {ObjectId} = require("mongodb");



// router.get("/last",(req,res) => {
//     var last_element;
//      Product.find({category:"Eyeglasses"}).sort({_id:-1}).limit(1).then(
//         (data) =>{
//             console.log(data);
// last_element=data;

//         }
//     )
//     res.status(200).send({last:last_element});
// }
// )

// router.get("/count",(req,res)=>{
//     Product.find({category:"Eyeglasses"}).count().then
//     (
//         (count) => {
//         console.log(count);
//     }
// )
// res.end();
// }
// )


router.get("/", (req, res) => {
        let counter = 0;
        if (req.query.count !== undefined) {
            counter = parseInt(req.query.count);
        }
        Product.find({
                category: "Eyeglasses"
            })
            .limit(4)
            .skip(counter)
            .then(
                (allEye) => {
                    res.status(200).send(allEye);
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