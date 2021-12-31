import "./Admin.css";
import {  useHistory } from "react-router-dom";


function Admin(){

    const history = useHistory();

    //function pushes to addproduct page
    function handleProduct(){
        history.push("/addProduct");
    }

    function handleUsers(){
        history.push("/users");
    }
   
    return(
        <div className="main ">
            {/* welcome text */}
            <p className="m-5 text-dark h3">Hey,Cheif welcome back</p>
            <div className="d-flex">
                {/* product  */}
                <div className=" container text-center mb-5 w-25 ">
                    <img   src="https://cdn.iview.abc.net.au/thumbs/i/ck/CK1714V_59a4b949bbec1_1280.jpg" alt=".."></img>
                    <button onClick={handleProduct} className="admin-button">Create Product</button>
                </div>
                {/* users */}
                <div className=" container text-center mb-5 w-25 ">
                    <img   src="https://www.elegantthemes.com/blog/wp-content/uploads/2021/04/add-new-user-wordpress.jpg" alt=".."></img>
                    <button onClick={handleUsers} className="admin-button">Manage Users</button>
                </div>
            </div>

            
        </div>
       
    );
}

export default Admin;