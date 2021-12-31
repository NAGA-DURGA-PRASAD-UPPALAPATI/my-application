import "./Search.css";
import {useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import * as ReactBootStrap from "react-bootstrap";

function Search(){
    let paramsObj=useParams();
    let [product,setProduct]=useState([]);
    let [searchResult,SetSearchResult]=useState([]);
    let [spin,setSpin]=useState(false);
    const history = useHistory();
    useEffect(()=>{
        axios.get("http://localhost:5000/product/getproduct")
            .then(res=>{
                let productObj=res.data.message; 
                setProduct(productObj);
                // filter the search results
                // eslint-disable-next-line array-callback-return
                let Result=  productObj.filter((item)=>{
                    if(item.bookname.toLowerCase().includes(paramsObj.search.toLowerCase())){
                        return item;
                    }
                    else if(item.authorname.toLowerCase().includes(paramsObj.search.toLowerCase())){
                        return item;
                    }
                    else if(item.price<Number(paramsObj.search)){
                        return item;
                    }
                });
                SetSearchResult(Result);
                setSpin(true);
          
           
            });
    },[paramsObj.search, searchResult]);

    function handleBook( bookname){
        history.push(`/book/${bookname}`);
    }
    return(<div>
        {/* loading symbol run */}
        {spin===false?<div className="text-center mt-5 h1">
            <ReactBootStrap.Spinner animation="grow" variant="primary" />
            <ReactBootStrap.Spinner animation="grow" variant="secondary" />
            <ReactBootStrap.Spinner animation="grow" variant="success" />
            <ReactBootStrap.Spinner animation="grow" variant="danger" />
            <ReactBootStrap.Spinner animation="grow" variant="warning" />
            <ReactBootStrap.Spinner animation="grow" variant="info" />
            <ReactBootStrap.Spinner animation="grow" variant="dark" />
        </div>:<div>

            {/*  */}
            {searchResult && searchResult.length===0?<div>


                <div className="text-center mt-5 h1">
                    <ReactBootStrap.Spinner animation="grow" variant="primary" />
                    <ReactBootStrap.Spinner animation="grow" variant="secondary" />
                    <ReactBootStrap.Spinner animation="grow" variant="success" />
                    <ReactBootStrap.Spinner animation="grow" variant="danger" />
                    <ReactBootStrap.Spinner animation="grow" variant="warning" />
                    <ReactBootStrap.Spinner animation="grow" variant="info" />
                    <ReactBootStrap.Spinner animation="grow" variant="dark" />
                </div>


                <h1 className="bg-dark text-danger p-1 mt-3">Sorry for the Inconvenience, No result found for {paramsObj.search}</h1>
                <div className="text-center">
                    <img alt="img" src="https://unbxd.com/wp-content/uploads/2014/02/No-results-found.jpg"></img>
                </div>
                <h1 className="bg-dark text-light p-1 mt-3">Similar to {paramsObj.search}</h1>
                {product.map((item)=>{




                    return(
                            
                                        
                        
                        <div key={item._id} className="cat-card card m-5 mx-auto">
                            <div className="row">
                                <div className="col-md-5 text-center">
                                    <img  src={item.profilePic} className=" cat-img" alt="img"></img>
                                </div>

                                <div className="col-md-7">
                                    <div className="card-body">


                                        <h2 className="cat-h1 " onClick={()=>handleBook(item.bookname)}>Product Name : {item.bookname} </h2>
                                        <h4>Published Date : {item.publishDate}</h4>
                                        <h6 className="">Author :  {item.authorname}</h6>
                                        <h6 className="">   Price : <s className="text-danger">{item.price}</s>  </h6>
                                        <h6>Offer Price : {item.price-(item.price)/10} <span className="ms-2 text-success">You save Upto : {(item.price)/10} </span>  </h6>
                                        <p><span className="h6">Description :</span>{item.description}</p>
                                
                                
                                        <span className="h2">Rating : </span>  <ReactStars
                                            count={5}
                                            value={item.rating}
                                            size={48}
                                            activeColor="#ffd700"
                                            readonly
                                        />


                            
                                    </div>
                                </div>

                            </div>

                        </div>
                    );




                })}
            </div>
                :<div>
                    <h1 className="bg-secondary text-light p-1 mt-3"> found {searchResult.length} of {product.length}</h1>
                    <div className="text-center">
                        <img className="w-50" src="https://blog.appharbor.com/Resources/Images/found_rgb_24bitalpha.png" alt="img"></img>
                    </div>
                    <h1 className="bg-secondary text-light p-1 mt-3"> search result for {paramsObj.search}</h1>
                </div>}
            { searchResult && 
            
        // eslint-disable-next-line array-callback-return
        searchResult.map((item)=>{
            return(
                
                
                // eslint-disable-next-line react/jsx-key
                <div className="cat-card card m-5 mx-auto">
                    <div className="row">
                        <div className="col-md-5 text-center">
                            <img  src={item.profilePic} className=" cat-img" alt="img"></img>
                        </div>

                        <div className="col-md-7">
                            <div className="card-body">


                                <h2 className="cat-h1 " onClick={()=>handleBook(item.bookname)}>Product Name : {item.bookname} </h2>
                                <h4>Published Date : {item.publishDate}</h4>
                                <h6 className="">Author :  {item.authorname}</h6>
                                <h6 className="">   Price : <s className="text-danger">{item.price}</s>  </h6>
                                <h6>Offer Price : {item.price-(item.price)/10} <span className="ms-2 text-success">You save Upto : {(item.price)/10} </span>  </h6>
                                <p><span className="h6">Description :</span>{item.description}</p>
                     
                       
                                <span className="h2">Rating : </span>  <ReactStars
                                    count={5}
                                    value={item.rating}
                                    size={48}
                                    activeColor="#ffd700"
                                    readonly
                                />

          
                   
                            </div>
                        </div>

                    </div>

                </div>
            );})
            }</div>}
 
    </div>);
}
export default Search;