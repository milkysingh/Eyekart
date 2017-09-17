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


    req.user.productsInCart.push({pid:req.body.cartProduct});
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
    console.log(req.body.id);
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

router.get("/getFromCart",authenticate,(req,res)=>{

   const inCartProducts= req.user.productsInCart;
if(inCartProducts.length===0){
    res.status(200).send({cartProducts:[]});
}
   const productInfo=[];
   inCartProducts.forEach(function(element) {
Product.findById(element.pid)
.then(
    (data)=>{
        // console.log(data);
        inCartProducts.push(data);
        // res.status(200).send(data);
    }
)
.catch(
    (e) => {
        console.log(e);
        res.status(400).send();
    }
);
   });
 
// console.log(Product.findById(inCartProducts));
 setTimeout(function() {
    res.send(productInfo);
 }, 3000); 
 } 
);
module.exports = router;