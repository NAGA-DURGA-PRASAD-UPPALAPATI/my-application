/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
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



//bcryptjs
const bcryptjs=require("bcryptjs");
//web token
const jwt=require("jsonwebtoken");




//create user by async
userApi.post("/createuser",multerObj.single("photo"),errHandler( async(req, res, next) => {
    let userCollectionObject=req.app.get("userCollectionObject");
    //get user object
    let newUser = JSON.parse(req.body.userObj);
    
    //check username is already existed
    let user=await userCollectionObject.findOne({ email: newUser.email });
    if(user===null){
        //hash password
        let hashedpassword=await bcryptjs.hash(newUser.password,9);
        //adding pasword
        newUser.password=hashedpassword;
        // adding cdn links
        newUser.profilePic=req.file.path;

        await userCollectionObject.insertOne(newUser);
        res.send({message:"User account created"});
    }
    else{
        res.send({message:"user existed"});
    }
}));

//reading all users
userApi.get("/getuser",errHandler(async(req,res,next)=>{

    let userCollectionObject=req.app.get("userCollectionObject");
    let user=await userCollectionObject.find().toArray();
    res.send({message:user});
    
    
    
    
}
));



//userlogin
userApi.post("/login",errHandler( async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject");
    let credentials=req.body;
    //verify user
    let user=await userCollectionObject.findOne({email:credentials.email});
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

//adding user orders
userApi.post("/orders",errHandler(async(req,res,next)=>{

    let orderCollectionObject=req.app.get("orderCollectionObject");
    let cartObject=req.body;
    await orderCollectionObject.insertOne(cartObject);
}
));

//display orders
userApi.get("/getorders/:username",errHandler( async(req,res,next)=>{
   
    let username=req.params.username;
    let orderCollectionObject=req.app.get("orderCollectionObject");
    let userlist= await orderCollectionObject.find({username:username}).toArray();
    res.send({message:userlist});
}));

// adding users whishlist
userApi.post("/whish",errHandler(async(req,res,next)=>{

    let whishCollectionObject=req.app.get("whishCollectionObject");
    let cartObject=req.body;
    await whishCollectionObject.insertOne(cartObject);
}
));

//reading whish list
userApi.get("/getwhish/:username",errHandler( async(req,res,next)=>{
   
    let username=req.params.username;
    let whishCollectionObject=req.app.get("whishCollectionObject");
    let userlist= await whishCollectionObject.find({whish:username}).toArray();
    res.send({message:userlist});
}));

//removing whish 

userApi.post("/removewhish/:username",errHandler( async(req,res,next)=>{
   
    let bookname=req.params.username;
   
    let cartObject=req.body;
    
   
    let whishCollectionObject=req.app.get("whishCollectionObject");
    await whishCollectionObject.deleteOne({bookname:bookname});
    res.send({message:"book removed from Whishlist"});
}));






module.exports= userApi;