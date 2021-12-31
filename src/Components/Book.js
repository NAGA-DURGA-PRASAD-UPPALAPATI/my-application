
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./Book.css";
import ReactStars from "react-rating-stars-component";
import {  useHistory } from "react-router-dom";

function Book(){

    let paramsObj=useParams();
    let [product,setProduct]=useState();
    const history = useHistory();


    useEffect(()=>{
        axios.get(`http://localhost:5000/product/getbook/${paramsObj.bookname}`)
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj);
            
            });
    });
    function  handleCart(cartObj){
           
           
        cartObj.username=localStorage.getItem("name");
        cartObj.quantity=1;
            
        axios.post("http://localhost:5000/product/cart",cartObj)
            .then(res=>{
                let response=res.data.message;
                alert(response);
                history.push("/cart");
            })
            .catch(err=>{
                alert(err);
            });
            
       

    }

   
    function handleEdit(edit){
        history.push(`/edit/${edit}`);
    }
    function handleDelete(del){
            
               
        axios.post(`http://localhost:5000/product/delete/${del}`)
            .then(res=>{
                let resobj=res.data;
                alert(resobj.message);
                if(resobj.message==="product deleted"){
                    history.push("/");
                }
            })
            .catch(err=>{
                console.log(err);
                alert(err.message);
            });
                   
    }

    function handleWhish(){
        alert("Product Added to Whishlist");
        product.whish=localStorage.getItem("name");
        axios.post("http://localhost:5000/user/whish/",product)
            .then()
            .catch(err=>{
                console.log(err);
                alert(err.message);
            });
        
    }

        
    return(<div className="m-3">
        { product &&

                    <div className="container-book">
                        
                        <div className="row ">
                            <div className="col-md-2">
                                <div className="card book-img  border-0 shadow ">
                                    <img  src={product.profilePic} alt="img"></img>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-body h-100 justify-content-center border-0 shadow ">
                                    <h2 className=" ">Book Name : {product.bookname} </h2>
                                    <h4>Published Date : {product.publishDate}</h4>
                                    <h6 className="">Author :  {product.authorname}</h6>
                                    <h6 className="">   Price : <s className="text-danger">{product.price}</s>  </h6>
                                    <h6>Offer Price : {product.price-(product.price)/10} <span className="ms-2 text-success">You save Upto : {(product.price)/10} </span>  </h6>
                                    <p><span className="h6">Description :</span>{product.description}</p>


                                    <span className="h2">Rating : </span>  <ReactStars
                                        count={5}
                                        value={product.rating}
                                        size={48}
                                        activeColor="#ffd700"
                                        readonly
                                    />
                                    <hr className="border border-dark border-2"></hr>


                                    <h4>User Ratings</h4>
                                    <img className="user-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="img"></img>
                                    <h5>Emma</h5>
                                    <ReactStars
                                        count={5}
                                        value={product.rating}
                                        size={20}
                                        activeColor="#ffd700"
                                        readonly
                                    />
                       
                                    <h6 className="text-secondary">Reviewed in India on {product.publishDate}</h6>
                                    <p>It’s an interesting book for answers on various life situations . Easy to read , easy to understand . A practical book on how to live day today . Sometimes we all need reminders . A must have book on your book shelf</p>
                                    <div>
                                        <span className="h6 " >Was this helpful ?</span><span className="h6">Report</span>
                                    </div>
                                    <hr className="border border-dark border-2"></hr>
                                    <div className="mt-3">
                                        <h5>Review this product</h5>
                                        <p>Share your thoughts with other customers</p>
                                        <button className="btn btn-secondary">Write a product review</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card border-0 shadow  ">
                                    <div className="m-2">
                                        <h4 className=" text-success"> ₹ {product.price-(product.price)/10}  </h4>
                                        <h6 className="text-danger">   Price : <s>{product.price}</s>  </h6>

                                        <span className=" text-secondary">You save  : {(product.price)/10} (10%) </span> 
                                        <p>Inclusive of all taxes</p>
                                        {localStorage.getItem("loginStatus")==="login success"?
                                            localStorage.getItem("name")==="admin-1"?
                                                <div>
                                                    <button className='add-cart'onClick={()=>handleEdit(product.bookname)}>Edit</button>
                                                    <button className='buy-now'onClick={()=>handleDelete(product.bookname)} >Delete</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className='add-cart' onClick={()=>handleCart(product)}>Add to Cart</button>
                                                    <button className='buy-now'>Buy Now</button>
                                                </div>
                                            :
                                            <div>
                                                <button className='add-cart' disabled>Add to Cart</button>
                                                <button className='buy-now' disabled>Buy Now</button>
                                                <p className="text-danger"><span className="h6">*</span> Please login to proceed further</p>
                                            </div>
                                        } 
                                    </div>
                                
                                </div>
                                {localStorage.getItem("loginStatus")==="login success"?
                                    localStorage.getItem("name")==="admin-1"? 


                                        <div className="mt-5 " >
                                            <button className='add-list' disabled >Add to Whishlist</button>
                                            <div className="mt-3">
                                                <span className="h5 ">Share </span>
                                                <span className="h3 ms-3"><i className="far fa-envelope ms-1"></i></span>
                                                <span className="h3 ms-3"><i className="fab fa-facebook-square ms-1"></i></span>
                                                <span className="h3 ms-3"><i className="fab fa-twitter ms-1"></i></span>
                                            </div>
                                        </div>



                                        :
                                        <div className="mt-5">
                                            <button className='add-list' onClick={handleWhish}>Add to Whishlist</button>
                                            <div className="mt-3">
                                                <span className="h5 btn btn-outline-info"  data-bs-toggle="modal" data-bs-target="#exampleModal">Share </span>
                                                <span className="h3 ms-3"><i className="far fa-envelope ms-1"></i></span>
                                                <span className="h3 ms-3"><i className="fab fa-facebook-square ms-1"></i></span>
                                                <span className="h3 ms-3"><i className="fab fa-twitter ms-1"></i></span>
                                            </div>
                                        </div>
                                    :


                                    <div className="mt-5" >
                                        <button className='add-list' disabled >Add to Whishlist</button>
                                        <div className="mt-3">
                                            <span className="h5 btn  " >Share </span>
                                            <span className="h3 ms-3"><i className="far fa-envelope ms-1"></i></span>
                                            <span className="h3 ms-3"><i className="fab fa-facebook-square ms-1"></i></span>
                                            <span className="h3 ms-3"><i className="fab fa-twitter ms-1"></i></span>
                                        </div>
                                    </div>
                                    
                                }
                                {/*  Modal  */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title h1" id="exampleModalLabel">Link </h5>
                                                <button className="btn btn-danger"  data-bs-dismiss="modal" >
                                                    <span>X</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p className="h6 text-primary"> http://localhost:3000/book/{product.bookname}</p>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

        
        }
    </div>);
}

export default Book;