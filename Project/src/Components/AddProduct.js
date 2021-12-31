import "./Addproduct.css";
import { Link, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useState } from "react";
import axios from "axios";


function AddProduct(){
    

    const history = useHistory();
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [file,setFile]=useState();
    let [value,setValue]=useState(0);

    const formHandleSubmit=(productObj)=>{
        //getting name from local storage
        productObj.name=localStorage.getItem("name");
        //create Formdata obj
        let formData=new FormData();
        //add files to formdat
        formData.append("photo",file,file.name);
        //add userobj to form data
        formData.append("userObj",JSON.stringify(productObj));


        // axios post request for adding product 
        axios.post("http://localhost:5000/product/createproduct",formData)
            .then(res=>{
                let resobj=res.data;
                alert(resobj.message);
                if(resobj.message==="product created"){

                    //based on condition the path is selected
                    if(localStorage.getItem("admin-1")){
                        history.push("/admin");
                    }
                    else{
                        history.push("/sellerproduct");
                    }
                }
            })
            .catch(err=>{
                console.log(err);
                alert("server is not respondoing!!! please check");
                alert(err.message);
            });
    };
    // selecting file from pc
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
                <form onSubmit={handleSubmit(formHandleSubmit)}>

                    {/* book name */}

                    <h5>Book Name</h5>
                    <input type='text' className="form-control border  border-dark" {...register("bookname",{required:true})} autoComplete="off"  />
                    {errors.bookname?.type==="required" && <p className="text-danger">bookname is Required</p>}

                    {/* author */}
                    <h5>Author Name</h5>
                    <input type='text' className="form-control border  border-dark" {...register("authorname",{required:true})} autoComplete="off"  />
                    {errors.authorname?.type==="required" && <p className="text-danger">Author Name is Required</p>}

                    {/* category */}
                    <h5>Category</h5>
                    <select className="form-control border  border-dark" {...register("category",{required:true})}>
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
                    <input type='date' className="form-control border  border-dark" {...register("publishDate",{required:true})} autoComplete="off"  />
                    {errors.publisDate?.type==="required" && <p className="text-danger">Publish Date is Required</p>}

                    {/* description */}
                    <h5>Description</h5>
                    <input type='text' className="form-control border  border-dark" {...register("description",{required:true})} autoComplete="off"  />
                    {errors.description?.type==="required" && <p className="text-danger">Description is Required</p>}

                    {/* cover pic */}
                    <h5>Cover Photo</h5>
                    <input type='file' className="form-control border  border-dark"  autoComplete="off" onChange={(e)=>onFileSelect(e)}  />
          
               
                    {/* price */}
                    <h5>Price</h5>
                    <input type='number' className="form-control border  border-dark" {...register("price",{required:true})} autoComplete="off"   />
                    {errors.price?.type==="required" && <p className="text-danger">Price is Required</p>}

                    {/* rating */}
                    <h5>Rating</h5>
                    <span className="me-3 h5" >{value} Star</span>
                    <input type='range'  {...register("rating",{required:true})}  min="0" max="5"  step="1" onChange={e=>setValue(e.target.value)}  />
                    {errors.rating?.type==="required" && <p className="text-danger">Rating is Required</p>}
                       
                    {/* submit button */}
                    <button type="submit"  className='login-signInButton mt-5'>Continue</button>




                </form>
            </div>

        </div>
    );
}

export default AddProduct;