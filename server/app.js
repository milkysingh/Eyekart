const express = require('express');
const app = express();
const body_parser=require("body-parser");
const path = require("path");
const port = process.env.PORT||3000;
const _=require("lodash");
const {ObjectId}=require("mongodb");

const {Mongoose}=require('./db/mongoose');
const {User}=require('./Models/users');
const {Product}=require('./Models/glasses');
const {authenticate}=require("./Middleware/authenticate");

app.use(body_parser.json());
//This is for signup
app.post("/signup", (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phn
    });
    user.save().then(
        () => {
            return user.generateAuthToken();
        }
    ).then(
        (token) => {
            res.header("x-auth", token).status(200).send(user);
        }
    ).
    catch(
        (err) => {
            res.status(400).send(err);
            console.log(err);
        }
    );
});
//This is for signin
app.post('/signin', (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password)
        .then(
            (user) => {
                return user.generateAuthToken();
            }
        )
        .then(
            (token) => {
                res.header("x-auth", ).status(200).send("Sucessfully logged in!");
            }
        )
        .catch(
            (e) => {
                res.status(400).send(e);
                console.log(e);
            }
        )

});
//this is for sunglasses
app.get("/sunglasses", (req, res) => {
    Product.find({
            category: "Sunglasses"
        })
        .then(
            (allSun) => {
                res.status(200).send(allSun);
            }
        )
        .catch(
            (err) => {
                res.send(400).send();
            }
        );
});
//this is for Eyeglasses
app.get("/eyeglasses", (req, res) => {
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
//This is lenses
app.get("/lenses", (req, res) => {
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
//Get sunglasses by id
app.get("/sunglasses/:id", (req, res) => {

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Product.findOne({
            _id: id,
            category:"Sunglasses"

        })
        .then(
            (sunglass) => {
                if (!sunglass) {
                    return res.status(404).send();
                }
                res.status(200).send(sunglass);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        );
});
//find eyeglasses by id
app.get("/eyeglasses/:id", (req, res) => {

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Product.findOne({
            _id: id,
            category:"Eyeglasses"
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
//Find lens by id
app.get("/lenses/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Product.findOne({
            _id: id,
            category:"Lenses"
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

//This is for adding new prodct
app.post("/add-new-product", (req, res) => {

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


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
