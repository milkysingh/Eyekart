const express = require('express');
const app = express();
const body_parser=require("body-parser");
const path = require("path");
const port = process.env.PORT||3000;
const _=require("lodash");
const {Mongoose}=require('./db/mongoose');
const {User}=require('./Models/users');
const {authenticate}=require("./Middleware/authenticate");

app.use(body_parser.json());

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

app.post('/signin',(req, res) => {
    const body=_.pick(req.body,["email","password"]);

User.findByCredentials(body.email,body.password).then(
    (user)=>{
        return user.generateAuthToken();
    }
)
  .then(
    (token)=>{
        res.header("x-auth",).status(200).send("Sucessfully logged in!");
    }
) 
.catch(
    (e)=>{
        res.status(400).send(e);
        console.log(e);
    }
)     

});


app.listen(port, () => {
console.log(`Server is running at port ${port}`);
});
