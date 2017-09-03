const User=require('../Models/users');
const authenticate=(req,res,next)=>{
const user =this;
let token=req.header('x-auth');
let verifyUser=user.findByToken(token);
if(!verifyUser){
    return Promise.reject();
}
req.user = verifyUser;
req.token = token;
next();
}

module.exports = {authenticate};