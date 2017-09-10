const express=require("express");
const router=express.Router();
const _=require("lodash");

const {User}=require('../Models/users');

router.post("/signup", (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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

router.post('/signin', (req, res) => {
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
                res.status(401).send(e);
                console.log(e);
            }
        );

});
module.exports = router;