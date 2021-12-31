import "./SellerProfile.css";
import { useHistory } from "react-router-dom";

function SellerProfile(){
    const history = useHistory();


    function handleProduct(){
        history.push("/addProduct");
    }

    function handleEdit(){
        history.push("/sellerproduct");
    }

    return(
        <div className="d-flex mt-5">
            <div className=" container text-center mb-5 w-25 ">
                <img   src="https://cdn.iview.abc.net.au/thumbs/i/ck/CK1714V_59a4b949bbec1_1280.jpg" alt=".."></img>
                <button onClick={handleProduct} className="admin-button">Create Product</button>
            </div>
            <div className=" container text-center mb-5 w-25 ">               
                <img   src="https://cdn.nerdschalk.com/wp-content/uploads/2020/03/nerdschalk.com-remove-edit-or-delete-permission.jpg" alt=".."></img>
                <button onClick={handleEdit} className="admin-button">Edit or Delete</button>
            </div>       </div> );

    
}

export default SellerProfile;