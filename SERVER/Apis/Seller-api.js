/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const exp = require("express");
const userApi=exp.Router();
userApi.use(exp.json());
const errHandler=require("express-async-handler");

//cloudinary
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");
//config cloudinary
cloudinary.config({
    cloud_name:"dplnv1vyk",
    api_key:"166191465281893",
    api_secret:"Hkf_raTMWsREuWPDi8LLehYXK2E"
});

////configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "CDB21DX003",
            public_key: file.fieldname + "-" + Date.now()
        };
    }
});
//configure multer
const multerObj=multer({storage: clStorage});

//middleware
// const checkToken =require("./middlewre/verifytoken")

//bcryptjs
const bcryptjs=require("bcryptjs");
//web token
const jwt=require("jsonwebtoken");




userApi.post("/createuser",multerObj.single("photo"),errHandler( async(req, res, next) => {
    let sellerCollectionObject=req.app.get("sellerCollectionObject");
    //get user object
    let newUser = JSON.parse(req.body.userObj);
    //check username is already existed
    let user=await sellerCollectionObject.findOne({ email: newUser.email });
    if(user===null){
        //hash password
        let hashedpassword=await bcryptjs.hash(newUser.password,9);
        //adding pasword
        newUser.password=hashedpassword;
        // adding cdn links
        newUser.profilePic=req.file.path;

        await sellerCollectionObject.insertOne(newUser);
        res.send({message:"Business Account Created"});
    }
    else{
        res.send({message:"Business Account Existed"});
    }
}));





//userlogin
userApi.post("/login",errHandler( async(req,res,next)=>{
    let sellerCollectionObject=req.app.get("sellerCollectionObject");
    let credentials=req.body;
    //verify user
    let user=await sellerCollectionObject.findOne({email:credentials.email});
    //if user not existed
    if(user===null){
        res.send({message:"invalid email"});
    }
    //user existed
    else{
    //compare password
        let result=await bcryptjs.compare(credentials.password,user.password);
        //if password not matched
        if(result===false){
            res.send({message:"invalid password"});
        }
        //if passsword matched
        else{
        //delete password from user
            delete user.password;
            //create a token and send
            let token=await jwt.sign({username:credentials.username},"abcdef",{expiresIn:180});
            res.send({message:"login success",token:token,email:credentials.email,username:user.username,user:user});
        }
    }}));

module.exports= userApi;