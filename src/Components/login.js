
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
function Login() {
    const history = useHistory();
    let {register,handleSubmit,formState:{errors}}=useForm();

    const formHandleSubmit=(userObj)=>{
        console.log(userObj.type);

        axios.post(`http://localhost:5000/${userObj.type}/login`,userObj)
            .then(res=>{
                let resobj=res.data;
                console.log(resobj);
                if(resobj.message==="login success"){
                //save token to local storage
              
                    localStorage.setItem("token",resobj.token);
                    localStorage.setItem("email",resobj.email);
                    localStorage.setItem("user",JSON.stringify(resobj.user));
                    localStorage.setItem("loginStatus",resobj.message);
                    localStorage.setItem("name",resobj.username);
                    localStorage.setItem("type",userObj.type);
               
               
               
                    //navigate to userprofile
                    if(userObj.type==="user"){
                        alert(resobj.message);
                        history.push(`/userprofile/${resobj.username}`);
                    }
                    //navigate to admin profile
                    if(userObj.type==="admin"){
                        alert(resobj.message);
                        history.push("/admin");
                    }

                    //navigate to business profile
                    if(userObj.type==="seller"){
                        alert(resobj.message);
                        history.push("/seller");
                    }
 
                }
                else{
                    alert(resobj.message);
                }
            })
            .catch(err=>{
                console.log(err);
                alert("something went wrong in login");
            });
    };
    
    // naviagte to registration page
    function handleRegister(){
        history.push("/register");
    }
    return (

    // login form
        <div className='login'>

            {/* logo & navigation to home page */}
            <Link to='/'>
                <img
                    className="login-logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                    alt="img"/>
            </Link>

            <div className='login-container'>
                <h1>Sign-in</h1>

                <form onSubmit={handleSubmit(formHandleSubmit)}>
                        
                    {/* login type  */}
                    <h5>Login Into</h5>
                    <div className=''>
                        <select className="form-control border  border-dark" {...register("type",{required:true})}>
                            <option value="user">User Account</option>
                            <option value="seller">Business Account</option>
                            <option value="admin">Admin Account</option>
                        </select>
                 
                    </div>
                       
                    {/* email input field */}
                    <h5>E-mail</h5>
                    <input type='email' {...register("email",{required:true})} className="form-control border border-dark" autoComplete="off"  />
                    {errors.username?.type==="required" && <p className="text-danger">Username is required</p>}
                          
                    {/* password input field */}
                    <h5>Password</h5>
                    <input type='password' {...register("password",{required:true})} className="form-control border border-dark" autoComplete="off" />
                    {errors.password?.type==="required" && <p className="text-danger">Password is required</p>}
                          
                    {/* sign in button */}
                    <button type="submit"  className='login-signInButton'>Sign In</button>
                </form>

                <p>
                By continuing, you agree to Amazon Conditions of Use and Privacy Notice.
                </p>
                    
                {/* register button */}
                <div className="text-center">
                    <h6>New to Amazon?</h6>
                </div>
                <button onClick={handleRegister}  className='login-registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    );
}

export default Login;