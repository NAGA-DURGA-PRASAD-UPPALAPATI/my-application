import {useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Category.css";
import ReactStars from "react-rating-stars-component";

function Category(){

    const history = useHistory();

    let paramsObj=useParams();
    let [product,setProduct]=useState();

    useEffect(()=>{
        axios.get(`http://localhost:5000/product/getproducts/${paramsObj.categoryName}`)
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj);
            });
    });

    function handleBook( bookname){
        history.push(`/book/${bookname}`);
    }


    return(
        <div>
            <h1 className="m-5">{paramsObj.categoryName}</h1>

            <div className="m-3  ">
                {
                    product && product.map((elements)=>
                   
                        
                        <div key={elements._id} className="cat-card card m-5 mx-auto">
                            <div className="row">
                                <div className="col-md-5 text-center">
                                    <img  src={elements.profilePic} className=" cat-img" alt="img"></img>
                                </div>

                                <div className="col-md-7">
                                    <div className="card-body">


                                        <h2 className="cat-h1 " onClick={()=>handleBook(elements.bookname)}>Product Name : {elements.bookname} </h2>
                                        <h4>Published Date : {elements.publishDate}</h4>
                                        <h6 className="">Author :  {elements.authorname}</h6>
                                        <h6 className="">   Price : <s className="text-danger">{elements.price}</s>  </h6>
                                        <h6>Offer Price : {elements.price-(elements.price)/10} <span className="ms-2 text-success">You save Upto : {(elements.price)/10} </span>  </h6>
                                        <p><span className="h6">Description :</span>{elements.description}</p>
                         
                           
                                        <span className="h2">Rating : </span>  <ReactStars
                                            count={5}
                                            value={elements.rating}
                                            size={48}
                                            activeColor="#ffd700"
                                            readonly
                                        />

              
                       
                                    </div>
                                </div>

                            </div>

                        </div>

               
                    )}
            </div>
        </div>

    
    );
}

export default Category;