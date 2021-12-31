/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const exp = require("express");
const productApi=exp.Router();
productApi.use(exp.json());
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
            folder: "CDB21DX003-Product",
            public_key: file.fieldname + "-" + Date.now()
        };
    }
});
//configure multer
const multerObj=multer({storage: clStorage});



//create product by async
productApi.post("/createproduct",multerObj.single("photo"),errHandler( async(req, res, next) => {

    let ProductCollectionObject=req.app.get("productCollectionObject");

    //get user object
    let newProduct = JSON.parse(req.body.userObj);
    //check username is already existed
    let user=await ProductCollectionObject.findOne({ bookname: newProduct.bookname });
    if(user===null){
        // adding cdn links
        newProduct.profilePic=req.file.path;
        await ProductCollectionObject.insertOne(newProduct);
        res.send({message:"product created"});
    }
    else{  
        res.send({message:"product existed"});
    }
}));

//update product
productApi.post("/updateproduct",multerObj.single("photo"),errHandler( async(req, res, next) => {

    let ProductCollectionObject=req.app.get("productCollectionObject");

    //get user object
    let newProduct = JSON.parse(req.body.userObj);
    // adding cdn links
    newProduct.profilePic=req.file.path;
   

    await ProductCollectionObject.updateOne({ bookname: newProduct.bookname },{$set:{...newProduct}});
   
    res.send({message:"product updated"});
   
   
}));

//delete product
productApi.post("/delete/:del",errHandler( async(req, res, next) => {

    let ProductCollectionObject=req.app.get("productCollectionObject");

 
    let delt=req.params.del;

    await ProductCollectionObject.deleteOne({ bookname: delt });
   
    res.send({message:"product deleted"});
   
   
}));

//get product
productApi.get("/getproduct", errHandler( async (req, res, next) =>{

    let ProductCollectionObject=req.app.get("productCollectionObject");
    let userlist= await ProductCollectionObject.find().toArray();
    res.send({message:userlist});
}));

//product by seller created name
productApi.get("/getproduct/:username", errHandler( async (req, res, next) =>{

    let ProductCollectionObject=req.app.get("productCollectionObject");

    let category=req.params.username;
    
  
    let userlist= await ProductCollectionObject.find({name:category}).toArray();
   
    res.send({message:userlist});
}));




//read product by category
productApi.get("/getproducts/:category", errHandler( async (req, res, next) =>{

    let ProductCollectionObject=req.app.get("productCollectionObject");

    let category=req.params.category;
  
    let userlist= await ProductCollectionObject.find({category:category}).toArray();
    res.send({message:userlist});
}));


//read book by name
productApi.get("/getbook/:bookname", errHandler( async (req, res, next) =>{

    let ProductCollectionObject=req.app.get("productCollectionObject");

    let category=req.params.bookname;
   
    
    //verify user
    let userlist=await ProductCollectionObject.findOne({bookname:category});
   
    
    res.send({message:userlist});
}));

//adding product to the cart
productApi.post("/cart",errHandler(async(req,res,next)=>{

    let cartCollectionObject=req.app.get("cartCollectionObject");
    let cartObject=req.body;
    let user=await cartCollectionObject.findOne({username:cartObject.username});
    let productInCart= await cartCollectionObject.findOne({bookname:cartObject.bookname});
    if(user===null){
        if(productInCart===null){
            await cartCollectionObject.insertOne(cartObject);
            res.send({message:"product added to cart"});
        }
    }
    else{
        if(productInCart===null){
            await cartCollectionObject.insertOne(cartObject);
            res.send({message:"product added to cart"});

        }
        else{
            let quant=productInCart.quantity +1;
            await cartCollectionObject.updateOne({bookname:cartObject.bookname},{$set:{quantity:quant}});
            res.send({message:"product added to cart"});
        }
    }
}));

// count
productApi.get("/getcount/:username",errHandler( async(req,res,next)=>{
   
    let username=req.params.username;

    let cartCollectionObject=req.app.get("cartCollectionObject");
    let userlist= await cartCollectionObject.find({username:username}).toArray();
    
   
    res.send({message:userlist});
}));

//displaying cart data

productApi.get("/getcart/:username",errHandler( async(req,res,next)=>{
   
    let username=req.params.username;
    let cartCollectionObject=req.app.get("cartCollectionObject");
    let userlist= await cartCollectionObject.find({username:username}).toArray();
    
   
    res.send({message:userlist});
}));

//increment quantity
productApi.post("/increment",errHandler( async(req,res,next)=>{

    let cartCollectionObject=req.app.get("cartCollectionObject");
    let cartObject=req.body;
    let bookIncart=await cartCollectionObject.findOne({username:cartObject.username}&& {bookname:cartObject.bookname});
    let quant=bookIncart.quantity +1;
    await cartCollectionObject.updateOne({username:cartObject.username } && {bookname:cartObject.bookname},{$set:{quantity:quant}});
    res.send({message:"Quantity increased  "});

}));


//decrement quantity
productApi.post("/decrement",errHandler( async(req,res,next)=>{

    let cartCollectionObject=req.app.get("cartCollectionObject");
    let cartObject=req.body;
    let bookIncart=await cartCollectionObject.findOne({username:cartObject.username}&& {bookname:cartObject.bookname});
    if(bookIncart.quantity<=1){
        await cartCollectionObject.deleteOne({username:cartObject.username } && {bookname:cartObject.bookname});
        res.send({message:"product removed"});

    }
    else{
        let quant=bookIncart.quantity -1;
        await cartCollectionObject.updateOne({username:cartObject.username } && {bookname:cartObject.bookname},{$set:{quantity:quant}});
        res.send({message:"Quantity decreased  "});
    }

}));

//remove product
productApi.post("/remove",errHandler( async(req,res,next)=>{

    let cartCollectionObject=req.app.get("cartCollectionObject");
    let cartObject=req.body;
  
    await cartCollectionObject.deleteOne({username:cartObject.username } && {bookname:cartObject.bookname});
    res.send({message:"product removed"});

}));





module.exports= productApi;