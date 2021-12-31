/* eslint-disable linebreak-style */
import axios from "axios";
// import {useParams} from "react-router-dom";
import { useEffect,useState } from "react";
// import { useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
function Users(){

    // let paramsObj=useParams();
    let [product,setProduct]=useState([]);
    let [spin,setSpin]=useState(false);
   
    // const history = useHistory();

    useEffect(()=>{
        axios.get("http://localhost:5000/user/getuser")
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj);
                setSpin(true);
                console.log(productObj);
            });
    });
    return(
        <div>

            {spin===false?<div className="text-center mt-5 h1">
                <ReactBootStrap.Spinner animation="grow" variant="primary" />
                <ReactBootStrap.Spinner animation="grow" variant="secondary" />
                <ReactBootStrap.Spinner animation="grow" variant="success" />
                <ReactBootStrap.Spinner animation="grow" variant="danger" />
                <ReactBootStrap.Spinner animation="grow" variant="warning" />
                <ReactBootStrap.Spinner animation="grow" variant="info" />
                <ReactBootStrap.Spinner animation="grow" variant="dark" />
            </div>:<div>
                <table className="mt-3 table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">User name</th>
                            <th scope="col">Image</th>
                            
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product && product.map((index)=>{
                            return(
                                
                                <tr key={index._id}>
                                    <td >{index.username}</td>
                                    <td><img width="50px" src={index.profilePic} ></img></td>
                                    <td><button  className="btn btn-outline-danger">X</button></td>
                                </tr>
                            ); })}
                        
                    </tbody>
                </table>
                
 
            </div>}
       
        </div>  );
    
}

export default Users;