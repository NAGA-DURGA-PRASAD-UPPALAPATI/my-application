
import axios from "axios";
import { useEffect,useState } from "react";
import {  useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import "react-toastify/dist/ReactToastify.css";
import "react-square-payment-form/lib/default.css";


import "./Cart.css";

function Cart(){

    let [cartObject,setCartObj]=useState("");
    let [total,setTotal]=useState(0);
    const history = useHistory();
    
    let amount=0;

    useEffect(()=>{
        axios.get(`http://localhost:5000/product/getcart/${localStorage.getItem("name")}`)
            .then(res=>{
                let cartData=res.data.message;
                setCartObj(cartData);
                for(let i=0;i<cartData.length;i++){
                   
                    amount=amount +(cartData[i].price-(Math.floor(cartData[i].price/10)))*cartData[i].quantity;
                }
                setTotal(amount);
            })
            .catch((err)=>{
                alert("something wrong with server connection");
                alert(err.message);
            });

   
   

    },[cartObject,total]);

    function increment(increment){
        increment.username=localStorage.getItem("name");
        axios.post("http://localhost:5000/product/increment",increment)
            .then(res=>{
                alert(res.data.message);

            })
            .catch((err)=>{
                alert("something wrong with server connection");
                alert(err.message);
            });

    }

    function decrement(decrement){
        decrement.username=localStorage.getItem("name");
        axios.post("http://localhost:5000/product/decrement",decrement)
            .then(res=>{
                alert(res.data.message);

            })
            .catch((err)=>{
                alert("something wrong with server connection");
                alert(err.message);
            });

    }

    function remove(remove){

        remove.username=localStorage.getItem("name");
        axios.post("http://localhost:5000/product/remove",remove)
            .then(res=>{
                alert(res.data.message);
                history.push("/");
            

            })
            .catch((err)=>{
                alert("something wrong with server connection");
                alert(err.message);
            });

    }
  
    function payments(){

        let orders={};
        
        for(let i=0;i<cartObject.length;i++){
            orders.username=localStorage.getItem("name");
            
            orders=cartObject[i];
            
            axios.post("http://localhost:5000/user/orders",orders)
                .then(res=>{
                    alert(res.data.message);
                    history.push("/");
                })
                .catch((err)=>{
                    alert("something wrong with server connection");
                    alert(err.message);
                });
        }
      
        alert("payment is Completed,Please awit for Delivery ");
    }

    
    

    return(<div className="m-3 mt-5">

        {cartObject.length===0?
            <div className="m-5 text-center cart  ">
                <h1 className="text-danger">Oops Your cart is empty</h1>
                <img className="cart-img-main" src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif" alt="img"></img>
            </div>
            :
         
            <div className="container-cart">
            
                <div className="row ">
                
                
                    <div className="col-md-8">
                    
               
                        <div className="card border-0 shadow  ">
                            <h1>Shopping Cart</h1>
                            <hr className="border border-1"></hr>
                   

                            {cartObject && cartObject.map((elements)=>
                                
                                <div key={elements._id}>
                                    <div className="row mb-2">
                                        <div className="col-md-2 ">

                                            <img className="cart-img" src={elements.profilePic} alt="img"></img>
                              
                                        </div>

                                        <div className="col-md-10">
                           

                                            <h2 className=" ">Product Name : {elements.bookname} </h2>
                                            <h6 className="">   Price : <s className="text-danger">{elements.price}</s>  </h6>
                                            <h6>Offer Price : {elements.price-(elements.price)/10} <span className="ms-2 text-success">You save Upto : {(elements.price)/10} </span>  </h6>
                           
                                            <div>
                                                <span className="h4 ">Qty :</span>
                                                <span className="h2 btn btn-outline-success plus ms-3" onClick={()=>increment(elements)}>+</span>
                                                <span className="h2  ms-3">{elements.quantity}</span>
                                                <span className="h2  minus btn btn-outline-warning ms-3" onClick={()=>decrement(elements)}>-</span>
                                                <span className="h6 remove btn btn-outline-danger ms-3" onClick={()=>remove(elements)}>Remove</span>
                                                <span className="ms-2 text-info h6">Total :{(elements.price-(Math.floor(elements.price/10)))*elements.quantity}</span>
                                               
                                            </div>
                              
                            
                            
                                        </div>
                          

                                    </div>
                                    <hr className="border border-1"></hr>
                                </div>
                       
                       
                            )}
                
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow  ">
                   
                            <h2 className="mt-3 text-danger">Sub-Total : {total} </h2>
                            <div className="text-center mb-5">
                                {/* <button className="cart-btn ">Proceed to Buy</button> */}
                                <StripeCheckout className="mt-3"
                                    stripeKey="pk_test_51JCgnCSFkM8mIruoggDepHpHtlQLZmJFz8dRwiFO2qfAAORKhyRkpyYc6Mp0ELKbC4EgWAANsN4Pin4sCb225eSl00DCc0owyZ"
                                    billingAddress
                                    shippingAddress
                                    amount={total*100}
                                    token={()=>payments()}
                                />


       
     
                            </div>
                    
                        </div>
                    
                    </div>
                </div>
            </div>
        }
    </div>);

}


export default Cart;