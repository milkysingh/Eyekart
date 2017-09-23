const express=require("express");
const router=express.Router();
const _=require("lodash");
const {authenticate}=require("../Middleware/authenticate");
const {User}=require('../Models/users');
const{ObjectID} =require("mongodb");
const {Product} =require("../Models/glasses");

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
                res.header("x-auth", token).status(200).json({
                    msg: "Success"
                });
            }
        )
        .catch(
            (e) => {
                res.status(401).send(e);
                console.log(e);
            }
        );

});

router.post('/addToCart', authenticate, (req, res) => {


    req.user.productsInCart.push({pid:req.body.cartProduct,quantity:req.body.quantity});
    req.user.save()
        .then(
            () => {
                res.status(200).send({msg:"Item saved"});
            }
        )
        .catch(
            (e)=>{
                res.status(400).send({msg:"Something went wrong"});
            }
        );
});

router.patch("/removeFromCart",authenticate,(req,res)=>{
   
    req.user.removeProductById(req.body.id)
    .then(
        (data) =>{
            res.status(200).send({msg:data})
        }
    )
    .catch(
        (e)=>{
            res.status(400).send({msg:"Something went wrong"});
        }
    );
});

router.get("/getFromCart", authenticate, (req, res) => {

    // getting array of product id (middleware);
    // declaring all variable in one place, (Variable declartion pattern)
    const inCardProducts = req.user.productsInCart;



    // cart is empty
    if (_.isEmpty(inCardProducts)) {
        return res.status(200).send([]);
    }

    // as this is an async call, using promise feature 
    // each findByID call would return a promise so using map function 
    let promiseArray = _.map(inCardProducts, element => {
        // the following is short circuit evaluation method.
        // checking if element.id is not falsy (null, undefined, 0, false..)
        return Product.findById(element.pid)
            .then(data => {
                
                data.quantity = element.quantity;
                return Promise.resolve(data);

            })
            .catch(err => {
                // error occured, Promise rejected
                console.log(err);
                return Promise.reject({
                    statusCode: 500,
                    message: "Technical Error!"
                });
            })
    });

    // Now using promise.all feature , promise.all will wait till all prmoises in the array have been resolved,

    Promise.all(promiseArray)
        .then(values => {
            // values will be an array of all promises resolved (object in our case)

            res.status(200).send(values);
        })
        .catch(err => {
            // when any of the promise is reject
            res.status(500).send(err);
        });

});

    router.post("/addLocalProducts",authenticate,(req,res)=>{
   
   req.user.productsInCart.push(...req.body.localProducts);
   req.user.save()
   .then(
    () => {
        res.status(200).send({msg:"Data added succesfully"});
    }
   )
   .catch(
       (err) => {
res.status(500).send(err);
       }
   )
    res.end();
    });

    router.delete("/removeToken",authenticate,(req,res)=>{
     
        req.user.removeToken(req.token).then(()=>{
            res.status(200).send();
        },
        ()=>{
            res.status(400).send();
        });
      
    });
module.exports = router;