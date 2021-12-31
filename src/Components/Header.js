
import "./Header.css";
import { useEffect,useState } from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {  useHistory } from "react-router-dom";


function Header(){
    const history = useHistory();
    let [count,setCount]=useState(0);
                  
    let {register,handleSubmit,}=useForm();

    useEffect(()=>{
        axios.get(`http://localhost:5000/product/getcount/${localStorage.getItem("name")}`)
            .then(res=>{
                let userobj=res.data.message;
                let Counter=userobj.length;
                setCount(Counter);});
    });
    // .catch((err)=>{
    //     alert(err.message);
    // });



    function handleLogin(){
        history.push("/login");

    }

    function handleSignout(){
        alert("sign out successfully");
        localStorage.clear();
        history.push("/");
    }

    function handleSearch(searchObj){
                
        history.push(`/search/${searchObj.search}`);
    }


             

    return(

        <>
       

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
    
                    <Link  to="/home" className="navbar-item me-5">
                        <div className="header-logo ">
                            <img
                                className="header-logo-image"
                                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Logo"/>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
                            <li className="nav-item dropdown">


                                <Link className="header-account  dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="one ">Hello,{localStorage.getItem("loginStatus")==="login success"?<span className="name"> {localStorage.getItem("name")}</span> : "Sign in"}</span><br></br>
                                    <span className="two ">Accounts & Lists </span>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown"> 
        
                                    <div className="text-center">
                                        { localStorage.getItem("loginStatus")==="login success"?
                                            <button onClick={handleSignout} className="sign bg-warning">Sign out</button>
                                            :
                                            <div>
                                                <button onClick={handleLogin} className="sign bg-warning">Sign in</button>
                                                <p>New Customer? <span><a href="/register" className="link">Start here</a></span></p>
                                            </div>
                                        }
         
                                        {/* drop down */}
                                    </div>
                                    <hr className="border border-2 border-dark"></hr>
                                    <div className="row row-cols-sm-2">
                                        <div className="col border-end border-dark">
                                            {/* list */}
                                            <h6 className="ms-3">Your Lists</h6>
                                            <li ><a className="dropdown-item" href="/">Create Wish List</a></li>
                                            <li><a className="dropdown-item" href="/">Find Wish List</a></li>
                                            <li><a className="dropdown-item" href="/">Explore  </a></li>
                                            <li><a className="dropdown-item" href="/">Wish from any website </a></li>
                                        </div> 
          
                                        <div className="col">
                                            <h6 className="ms-3">Your Account</h6>
                                            <li><a className="dropdown-item" href={ localStorage.getItem("loginStatus")==="login success"? localStorage.getItem("name")==="admin-1"?"/admin": `/userprofile/${localStorage.getItem("name")} `: "/login" }>Your Account</a></li>
                                            <li><a className="dropdown-item" href="/">Your Wishlist</a></li>
                                            <li><a className="dropdown-item" href="/">Your Prime Account</a></li>
                                            <li><a className="dropdown-item" href={ localStorage.getItem("type")==="seller"? "/seller": "/login" }> Your Seller Account</a></li>
                                        </div>

                                    </div>
           
                                </ul>   
        
                            </li>
      
                        </ul>
                        <form className="d-flex search me-5 "onSubmit={handleSubmit(handleSearch)}>
                            <input className="form-control search me-2" {...register("search",{required:true})} type="search" placeholder="Search" aria-label="Search"></input>
        
                            <button type="submit" className="btn btn-outline-success" >Search</button>
                        </form>

                        <Link to="/cart" className="header-cart me-5  ">
                            <span className=" four"><i className="fas fa-shopping-cart fa-lg"></i></span>
  
                            <span className="three">{count}</span>

                        </Link> 
                    </div>

  
                </div>
            </nav>






        </>
    );
}

export default Header;