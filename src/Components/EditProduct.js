import "./EditProduct.css";
import {useParams} from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useState,useEffect } from "react";
import axios from "axios";

function EditProduct(){

    let paramsObj=useParams();
    
    let [product,setProduct]=useState();


    const history = useHistory();
    
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [file,setFile]=useState();
    let [value,setValue]=useState(0);


    useEffect(()=>{
        axios.get(`http://localhost:5000/product/getbook/${paramsObj.bookname}`)
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj);
            
            
            });
    });

    const formHandleSubmit=(productObj)=>{

            
        //create Formdata obj
        let formData=new FormData();
        //add files to formdat
        formData.append("photo",file,file.name);
        //add userobj to form data
        formData.append("userObj",JSON.stringify(productObj));
        console.log(formData);

        axios.post("http://localhost:5000/product/updateproduct",formData)
            .then(res=>{
                let resobj=res.data;
                alert(resobj.message);
                if(resobj.message==="product updated"){
                    history.push(`/book/${paramsObj.bookname}`);
                }
            })
            .catch(err=>{
                console.log(err);
                alert(err.message);
            });
    };

    const onFileSelect=(e)=>{
        setFile(e.target.files[0]);
    };




    return(
        
        

        <div className="main-div">
              
            {/* logo */}
            <Link to='/'>
                <img
                    className="login-logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt="img"
                />
            </Link>
            <div className="product-div">
                <h2>Create Product</h2>

                {/* form */}
                {product &&
        <form onSubmit={handleSubmit(formHandleSubmit)}>

            {/* book name */}

            <h5>Book Name</h5>
            <input type='text' className="form-control border  border-dark" {...register("bookname",{required:true})} value={product.bookname} autoComplete="off"  />
            {errors.bookname?.type==="required" && <p className="text-danger">bookname is Required</p>}

            {/* author */}
            <h5>Author Name</h5>
            <input type='text' className="form-control border  border-dark" {...register("authorname",{required:true})} placeholder={product.authorname} autoComplete="off"  />
            {errors.authorname?.type==="required" && <p className="text-danger">Author Name is Required</p>}

            {/* category */}
            <h5>Category</h5>
            <select className="form-control border  border-dark" {...register("category",{required:true})} value={product.category}>
                <option>----Select Category----</option>
                <option value="HTML,CSS & RWD">HTML,CSS & RWD</option>
                <option value="Modern JavaScript">Modern JavaScript</option>
                <option value="React JS">React JS</option>
                <option value="Node JS">Node JS</option>
                <option value="Mongo DB">Mongo DB</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
            {errors.category?.type==="required" && <p className="text-danger">Category is Required</p>}

            {/* date */}
            <h5>Published Date</h5>
            <input type='date' className="form-control border  border-dark" {...register("publishDate",{required:true})} value={product.publishDate} autoComplete="off"  />
            {errors.publisDate?.type==="required" && <p className="text-danger">Publish Date is Required</p>}

            {/* description */}
            <h5>Description</h5>
            <input type='text' className="form-control border  border-dark" {...register("description",{required:true})} placeholder={product.description} autoComplete="off"  />
            {errors.description?.type==="required" && <p className="text-danger">Description is Required</p>}

            {/* cover pic */}
            <h5>Cover Photo</h5>
            <input type='file' className="form-control border  border-dark"  autoComplete="off"  onChange={(e)=>onFileSelect(e)}  />
          
               
            {/* price */}
            <h5>Price</h5>
            <input type='number' className="form-control border  border-dark" {...register("price",{required:true})} placeholder={product.price} autoComplete="off"   />
            {errors.price?.type==="required" && <p className="text-danger">Price is Required</p>}

            {/* rating */}
            <h5>Rating</h5>
            <span className="me-3 h5" >{value} Star</span>
            <input type='range'  {...register("rating",{required:true})}  min="0" max="5"  step="1"  onChange={e=>setValue(e.target.value)}  />
            {errors.rating?.type==="required" && <p className="text-danger">Rating is Required</p>}



            <button type="submit"  className='login-signInButton mt-5'>Continue</button>




        </form>
                }
            </div>

        </div>
        
        
    );
}

export default EditProduct;