/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const exp = require("express");
const adminApi=exp.Router();
adminApi.use(exp.json());
const errHandler=require("express-async-handler");

//web token
const jwt=require("jsonwebtoken");




adminApi.post("/login",errHandler( async(req,res,next)=>{
    let adminCollectionObject=req.app.get("adminCollectionObject");
    let credentials=req.body;
    //verify user
    let user=await adminCollectionObject.findOne({email:credentials.email});
    console.log(user);
    //if email not existed
    if(user===null){
        res.send({message:"invalid username"});
    }
    //email existed
    else{
    //compare password
   
        //if password not matched
        if(credentials.password!==user.password){
            res.send({message:"invalid password"});
        }
        //if passsword matched
        else{
        //delete password from user
            delete user.password;
            //create a token and send
            let token=await jwt.sign({email:credentials.email},"abcdef",{expiresIn:180});
            res.send({message:"login success",token:token,email:credentials.email,username:user.username});
        }
    }}));





module.exports= adminApi;