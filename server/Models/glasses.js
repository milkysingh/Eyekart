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
     ],
     quantity:{
         type:Number
     }

});

ProductSchema.statics.findById=function(id) {
    const product=this;

  return product.findOne({"_id":id})
       .then(
           (data) => {
      
                return data;
           }
       )
       .catch(
           (e) =>{
               console.log(e);
               return;
           }
       );

   
}

const Product=mongoose.model("Products",ProductSchema);
module.exports={Product};