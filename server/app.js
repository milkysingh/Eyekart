const express = require('express');
const app = express();
const cors=require("cors");
const body_parser=require("body-parser");
const path = require("path");
const port = process.env.PORT||3000;

const {ObjectId}=require("mongodb");

const {Mongoose}=require('./db/mongoose');


const Sunglasses=require("./Routes/sunglasses");
const Eyeglasses=require("./Routes/eyeglasses");
const Lenses=require("./Routes/lenses");
const Auth=require("./Routes/user");
const newProduct=require("./Routes/add-new-product");

var corsOptions = {
    'allowedHeaders': ['sessionId', 'Content-Type','x-auth'],
    'exposedHeaders': ['x-auth','maxCount'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

app.use(body_parser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(cors(corsOptions));

//This is for signup
app.use("/user",Auth);
//This is for signin
app.use("/user",Auth);
//this is for sunglasses
app.use("/sunglasses",Sunglasses);
//this is for Eyeglasses
app.use("/eyeglasses",Eyeglasses);
//This is lenses
app.use("/lenses",Lenses);
//Get sunglasses by id
app.use("/sunglasses",Sunglasses);
//find eyeglasses by id
app.use("/eyeglasses",Eyeglasses);
//Find lens by id
app.use("/lenses",Lenses);
//This is for adding new prodct
app.use("/add-new-product",newProduct);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});