import { useEffect,useState } from "react";
import {  useHistory } from "react-router-dom";


function UserProfile(){
    let [user,setUser]=useState("");
    const history = useHistory();
   


    useEffect(()=>{

        let userobj=JSON.parse( localStorage.getItem("user"));

        setUser({...userobj});
    },[]);

    function handleOrders(){
        history.push("/orders");
    }
     
    function handleWhish(){
        history.push("/whish");

    }
   
    return(
        <div className="">
            <h2 className=" text-info p-1 mt-3">Your Account</h2>
            <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3   main-row mt-3 mb-3 m-1">
                <div className="col">
                    <div className="card main-card mt-3">
                        <img className="img" src="https://blog-assets.lightspeedhq.com/img/2019/12/8c48d7df-retail-purchase-orders.jpg" alt="img"></img>
                        <h1 className="main-h1" onClick={handleOrders}>Your Orders</h1>
                        <h6 className="text-secondary">Track,return or buy things again</h6>
                    </div>
                </div>

                <div className="col">
                    <div className="card main-card mt-3">
                        <img className="img" src={user.profilePic} alt="img"></img>
                        <h1 className="main-h1">Login & Security</h1>
                        <h6 className="text-secondary">Edit Login,name and number</h6>
                    </div>
                </div>


                <div className="col">
                    <div className="card main-card mt-3">
                        <img className="img" src="https://images.moneycontrol.com/static-mcnews/2019/02/41G6zxxNH5L-770x433.jpg?impolicy=website&width=770&height=431" alt="img"></img>
                        <h1 className="main-h1">Prime</h1>
                        <h6 className="text-secondary">View Benefits and payment settings</h6>
                    </div>
                </div>



                <div className="col">
                    <div className="card main-card mt-3">
                        <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHu5P5S1w6nzIxB4MHPTBvfx9xu6_AqJx5w&usqp=CAU" alt="img"></img>
                        <h1 className="main-h1">Your Address</h1>
                        <h6 className="text-secondary">Edit address for orders and gifts</h6>
                    </div>
                </div>


                <div className="col">
                    <div className="card main-card mt-3">
                        <img src="https://cdn.shopify.com/app-store/listing_images/34ae0275ebf361b3f6135ce614b37b6e/banner/CITY2rz0lu8CEAE=.jpg" alt="img"></img>
                        <h1 className="main-h1" onClick={handleWhish}>Your Whishlist</h1>
                        <h6 className="text-secondary">Edit or add to Whishlist</h6>
                    </div>
                </div>


                <div className="col">
                    <div className="card main-card mt-3">
                        <img className="img" src="https://dazeinfo.com/wp-content/uploads/2020/10/amazon-pay-upi.png" alt="img"></img>
                        <h1 className="main-h1">Amazon Pay</h1>
                        <h6 className="text-secondary">Add money to your balance</h6>
                    </div>
                </div>






            </div>
           
           
        </div>
    );
}

export default UserProfile;