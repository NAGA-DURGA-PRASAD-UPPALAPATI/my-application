/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const exp=require("express");
const app=exp();
const cors=require("cors");
//for security
require("dotenv").config();

app.use(cors());

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});

const path=require("path");
//import apis
const userApi=require("./Apis/user-api");
const productApi=require("./Apis/product-api");
const adminApi =require("./Apis/admin-api");
const sellerApi=require("./Apis/Seller-api");

//connecting buid of react with current server
app.use(exp.static(path.join(__dirname,"./build/")));




// excute specific api based path
app.use("/user",userApi);
app.use("/product",productApi);
app.use("/admin",adminApi);
app.use("/seller",sellerApi);


//
//import
const mc=require("mongodb").MongoClient;

//url

const mongoUrl=process.env.DB_URL;
//connection with server
mc.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{

    if(err){
        console.log("err occured",err);
    }
    else{
        //data base obj
        let dbObj=client.db("Project");

        let userCollectionObject=dbObj.collection("users");
        let adminCollectionObject=dbObj.collection("admin");
        let productCollectionObject=dbObj.collection("product");
        let cartCollectionObject=dbObj.collection("cart");
        let orderCollectionObject=dbObj.collection("orders");
        let sellerCollectionObject=dbObj.collection("seller");
        let whishCollectionObject=dbObj.collection("whish");

        
        //sharing object
        app.set("userCollectionObject",userCollectionObject);
        app.set("adminCollectionObject",adminCollectionObject);
        app.set("productCollectionObject",productCollectionObject);
        app.set("cartCollectionObject",cartCollectionObject);
        app.set("orderCollectionObject",orderCollectionObject);
        app.set("sellerCollectionObject",sellerCollectionObject);
        app.set("whishCollectionObject",whishCollectionObject);

        console.log("db connection success");
    }
});

//page refresh problem
app.get("/*", (req, res)=> {
    res.sendFile(path.join(__dirname, "./build/index.html"), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// handle invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`});
});

// handle errors
app.use((err,req,res,next)=>{
    console.log(err);
    res.send({message:err.message});
});


//assign port

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server is on ${port}..`));