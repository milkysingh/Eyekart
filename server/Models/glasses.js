const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
 
     name:{
         type:String,
         required:true
     },
     model_no:{
         type:String,
         required:true
     },
     category:{
         type:String,
         required:true
     },
     price:{
         type:Number,
         required:true
     },
     seller:{
         type:mongoose.Schema.Types.ObjectId,
         required:true
     },
     images: [
          { 
             type: String,
             required: true
         }
     ],
     sizes: [ 
         {
             type: String,
             required: true
         }
     ]

});

const Product=mongoose.model("Products",ProductSchema);
module.exports={Product};