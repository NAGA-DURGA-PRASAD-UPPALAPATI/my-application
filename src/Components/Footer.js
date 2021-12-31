import "./Footer.css";


function Footer(){
    return(


        <div className="mt-3 me-3">
            <section id="footer" className=" bg-dark">
                <div className="container-   ">
                    <div className="row text-center text-xs-center text-sm-left text-md-left">
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>Offer Terms & Conditions</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Returns & Exchange Policy</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Shipping Policy</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Privacy Policy</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Videos</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>ABOUT US</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Home</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>About</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>Contact Us</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Customer Support</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Store Locator</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                                <li><a href="/"><i className="fa fa-angle-double-right"></i>Help Center</a></li>
                
              
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                            <ul className="list-unstyled list-inline social text-center">
                                <li className="list-inline-item"><a href="/"><i className="fa fa-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="/"><i className="fa fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="/"><i className="fa fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="/"><i className="fa fa-google-plus"></i></a></li>
                                <li className="list-inline-item"><a href="/"><i className="fa fa-envelope"></i></a></li>
                            </ul>
                        </div>
                        <hr></hr>
                    </div>	
                    <>
                        <p className=" text-light h6 text-center">©2021,All right Reversed.</p>
                    </>
                </div>
            </section>
        </div>

    



    );
}


export default Footer;