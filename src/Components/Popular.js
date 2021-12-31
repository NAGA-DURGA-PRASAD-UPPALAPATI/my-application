import "./Popular.css";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-bootstrap/Carousel";

function Popular(){


    let [product,setProduct]=useState([]);
    
    const history = useHistory();
    useEffect(()=>{
        axios.get("http://localhost:5000/product/getproduct")
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj.reverse());
           
            });
    });

    function handleBook( bookname){
        history.push(`/book/${bookname}`);
    }

    return(



        <div>
            <h1 className="mt-3 bg-dark text-light p-1">Top-Rated</h1>
            <div className="containe mb-2 ">
                <Carousel>
                    {/*  eslint-disable-next-line array-callback-return */}
                    { product && product.filter((item)=>{
                        if(item.rating>4){
                            return item;
                        }
                    })
                        .map((index)=>{
                            return(
                                
                                <Carousel.Item key={index._id} fade={"0"} activeIndex="3" interval={3000} wrap={"boolean"} touch={"boolean"} pause={"hover"} nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}>
                                    <div className="container-book">
                                        <div className="row ">
                                            <div className="col-md-3">
                                                <div className="card    border-0 shadow ">
                                                    <img className="new-img" src={index.profilePic} alt="img"></img>
                                                </div>
                                            </div>
                                            <div className="col-md-9 ">
                                                <div className="card  card-body bg-dark text-light h-100  border-0 shadow ">
                                                    <h3 className="tex " onClick={()=>handleBook(index.bookname)}>Product Name : {index.bookname} </h3>
                                                    <h4>Published Date : {index.publishDate}</h4>
                                                    <h6 className="">Author :  {index.authorname}</h6>
                                                    <h6 className="">   Price : <s className="text-danger">{index.price}</s>  </h6>
                                                    <h6>Offer Price : {index.price-(index.price)/10} <span className="ms-2 text-success">You save Upto : {(index.price)/10} </span>  </h6>
                                                    <span className="h6">Rating : </span>  <ReactStars
                                                        count={5}
                                                        value={index.rating}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        readonly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                           
                    
                                </Carousel.Item>


                       
                            ); }) }
                </Carousel>
            </div>
            <hr className="border-5  border-dark"></hr>
            <div className='m-1'>
                <img width="100%" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Books/bb2/Ingress_Pc_1500x300-BB-July--2021.jpg" alt="img"></img>
            </div>
        </div>

    );
}

export default Popular;