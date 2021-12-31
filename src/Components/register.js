
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useState } from "react";
import axios from "axios";


function Register() {
    const history = useHistory();
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [file,setFile]=useState();
   

    const formHandleSubmit=(userObj)=>{


        let formData=new FormData();
        //add files to formdat
        formData.append("photo",file,file.name);
        //add userobj to form data
        formData.append("userObj",JSON.stringify(userObj));
        

        //pushing data to db
        axios.post(`http://localhost:5000/${userObj.type}/createuser`,formData)
            .then(res=>{
                let resobj=res.data;
                alert(resobj.message);
                if(resobj.message==="User account created"){
                    history.push("/login");
                }
                if(resobj.message==="Business Account Created"){
                    history.push("/login");
                }

            })
            .catch(err=>{
                console.log(err);
                alert("something is wrong");
            });
    };

    

    const onFileSelect=(e)=>{
        setFile(e.target.files[0]);

    };

    
    

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login-logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt="img"
                />
            </Link>

            <div className='login-container'>
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit(formHandleSubmit)}>

                    <h5>Register for</h5>
                    <div className=''>
                        <select className="form-control border  border-dark" {...register("type",{required:true})}>
                            <option value="user">User Account</option>
                            <option value="seller">Business Account</option>
                        
                        </select>
                 
                    </div>
  

                    <h5>Your Name</h5>
                    <input type='text' className="form-control border  border-dark" {...register("username",{required:true})} autoComplete="off"  />
                    {errors.username?.type==="required" && <p className="text-danger">Username is required</p>}

                    <h5>Mobile Number</h5>
                    <input type="number" className="form-control border border-dark" {...register("mobileNo",{required:true})} autoComplete="off" ></input>
                    {errors.mobileNo?.type==="required" && <p className="text-danger">Mobile No is required</p>}

                    <h5>Email</h5>
                    <input type="email" className="form-control border border-dark" {...register("email",{required:true})} autoComplete="off" ></input>
                    {errors.email?.type==="required" && <p className="text-danger">Email is required</p>}

                    <h5>Profile Pic</h5>
                    <input type="file" className="form-control border border-dark"{...register("pic",{required:true})} name="photo" onChange={(e)=>onFileSelect(e)}></input>
                    {errors.pic?.type==="required" && <p className="text-danger">Pic is required</p>}

                    <h5>Password</h5>
                    <input type='password'  className="form-control border border-dark" {...register("password",{required:true,minLength:6})} autoComplete="off"  />
                    {errors.password?.type==="required" && <p className="text-danger">Password is required</p>}
                    {errors.password?.type==="minLength" && <p className="text-danger h6"> Passwords must be at least 6 characters</p>}
   
                    <p><span className="text-danger h3">*</span>Passwords must be at least 6 characters.</p>

                    <button type="submit"  className='login-signInButton'>Continue</button>
                    
                </form>

                <p>
                We will send you a text to verify your phone.<br></br>Message and Data rates may apply.
                </p>

                
            </div>
        </div>
    );
}

export default Register;