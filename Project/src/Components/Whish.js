/* eslint-disable linebreak-style */
import { useEffect,useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
function Whish(){

    let [cartObject,setCartObj]=useState([]);
    let [spin,setSpin]=useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/getwhish/${localStorage.getItem("name")}`)
            .then(res=>{
                let cartData=res.data.message;
                setCartObj(cartData);
                setSpin(true);
        
            });
    });

    function handleRemove(remove){
        let   removeWhish=remove;
        let user=localStorage.getItem("name");
        console.log(removeWhish);

        axios.post(`http://localhost:5000/user/removewhish/${removeWhish}`,user)
            .then(res=>{
                let cartData=res.data.message;
                alert(cartData);
        
            });

    }
    return(

        spin===false?<div className="text-center mt-5 h1">
            <ReactBootStrap.Spinner animation="grow" variant="primary" />
            <ReactBootStrap.Spinner animation="grow" variant="secondary" />
            <ReactBootStrap.Spinner animation="grow" variant="success" />
            <ReactBootStrap.Spinner animation="grow" variant="danger" />
            <ReactBootStrap.Spinner animation="grow" variant="warning" />
            <ReactBootStrap.Spinner animation="grow" variant="info" />
            <ReactBootStrap.Spinner animation="grow" variant="dark" />
        </div>: <div>

            <table className=" table table-hover table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Remove</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {cartObject && cartObject.map((ele)=>{
                        return(
                            <tr key={ele._id}>
                                <td>{ele.bookname}</td>
                                <td><img width="60px" src={ele.profilePic} alt="img"></img></td>
                                
                                <td>{ele.price}</td>
                                <td><button onClick={()=>handleRemove(ele.bookname)} className="btn btn-outline-danger">X</button></td>
                              
                               
                            </tr>
                        );
                    })}

                  
                </tbody>
            </table>

        </div>);}
        
   
    
        
    

    



export default Whish;