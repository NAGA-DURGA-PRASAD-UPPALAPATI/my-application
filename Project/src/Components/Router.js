import { BrowserRouter,  Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./login";
import Register from "./register";
import UserProfile from "./userProfile";
import Admin from "./Admin";
import AddProduct from "./AddProduct";
import Timer from "./Timer";
import Home from "./Home";
import Book from "./Book";
import Category from "./Category";
import Cart from "./Cart";
import EditProduct from "./EditProduct";
import Search from "./Search";
import NewRealse from "./NewRelease";
import Popular from "./Popular";
import SellerProfile from "./SellerProfile";
import Footer from "./Footer";
import SellerProduct from "./SellerProducts";
import Users from "./Users";
import Orders from "./Orders";
import Whish from "./Whish";
function Router(){
    return(
        <div>
            <BrowserRouter>

                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/register">
                        <Register />
                    </Route>

                    <Route path="/userProfile/:username">
                        <Header />
                        <UserProfile />
                        <Footer />
                    </Route>
           
                    <Route path="/admin">
                        <Header />
                        <Admin />
                        <Footer />
                    </Route>

                    <Route path="/addProduct">
                        <AddProduct />
                    </Route>

                    <Route path="/sellerproduct">
                        <Header />
                        <SellerProduct />
                        <Footer />
                    </Route>

                    <Route path="/category/:categoryName">
                        <Header />
                        <Category />
                        <Footer />
                    </Route>

                    <Route path="/book/:bookname">
                        <Header />
                        <Book />
                        <Footer />
                    </Route>

                    <Route path="/edit/:bookname">
                        <EditProduct />
                    </Route>

                    <Route path="/cart" >
                        <Header />
                        <Cart />
                        <Footer />
                    </Route>

                    <Route path="/users" >
                        <Header />
                        <Users />
                        <Footer />
                    </Route>

                    <Route path="/search/:search" >
                        <Header />
                        <Search />
                        <Footer />
                    </Route>

                    <Route path="/seller" >
                        <Header />
                        <SellerProfile />
                        <Footer />
                    </Route>

                    <Route path="/orders" >
                        <Header />
                        <Orders />
                        <Footer />
                    </Route>

                    <Route path="/whish" >
                        <Header />
                        <Whish />
                        <Footer />
                    </Route>

                


                    <Route path="/home">
                        <Header />
                        <Timer />
                        <NewRealse />
                        <Home />
                        <Popular />
                        <Footer />
           
                    </Route>


                    <Route path="/">
                        <Header />
                        <Timer />
                        <NewRealse />
                        <Home />
                        <Popular />
                        <Footer />
           
                    </Route>
                </Switch>

    
            </BrowserRouter>
        </div>
    );
}

export default Router;