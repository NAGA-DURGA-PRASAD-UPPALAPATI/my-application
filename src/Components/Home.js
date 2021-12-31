import "./Home.css";
import { useHistory } from "react-router-dom";


function Home(){
    const history = useHistory();

    //  function to push to next page
    function category(categoryName){
        history.push(`/category/${categoryName}`);

    }
    return(


        <div>
            {/* heading */}
            <div>
                <h1 className="mt-3 bg-dark text-light p-1">Books By Category</h1>
            </div>
     
            {/* html card */}
            <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3   main-row mt-3 mb-3 m-1">
                <div className="column">
                    <div className="card main-card">
                        <img className="img" src="https://pixelmechanics.com.sg/wp-content/uploads/2019/06/html5-logo-for-web-development.png" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("HTML,CSS & RWD")}>HTML,CSS & RWD</h1>
                    </div>
                </div>
                {/* js card */}
                <div className="column">
                    <div className="card main-card">
                        <img className="img" src="https://repository-images.githubusercontent.com/229449376/3cfde400-5298-11ea-9f39-aab161ef8f69" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("Modern JavaScript")}>Modern JavaScript</h1>
                    </div>
                </div>
                {/* react card */}
                <div className="column">
                    <div className="card main-card">
                        <img className="img" src="https://easybase.io/assets/images/posts_images/5-great-react-libraries-1.png" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("React JS")}>React JS</h1>
                    </div>
                </div>

            </div>

            <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3  main-row mt-3 mb-3 m-1">
                {/* node card */}
               
                <div className="column">
                    <div className="card main-card ">
                        <img className="img" src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/262176/0508-HiringGuides-NodeJS_Dan_Social-cb33f70c56b0eb4df466056462ea3932.png" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("Node JS")}>Node JS</h1>
                    </div>
                </div>

                {/* db card */}
                <div className="column ">
                    <div className="card main-card">
                        <img className="img" src="https://miro.medium.com/max/1200/1*Mx3MUKkPENbaIR-vKGeLDw.jpeg" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("Mongo DB")}>Mongo DB</h1>
                    </div>
                </div>


                {/* full stac card */}
                <div className="column">
                    <div className="card main-card">
                        <img className="img" src="https://www.mindinventory.com/blog/wp-content/uploads/2018/07/full-stack1200.png" alt="img"></img>
                        <h1 className="main-h1" onClick={()=>category("Full Stack Developer")}> Full Stack Developer</h1>
                    </div>
                </div>
            </div>
                                          


            <hr className="border-5  border-dark"></hr>
            <div className='m-1'>
                <img width="100%" src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/092020/V248669633_regional_banner_1_revison_1500x3001.jpg" alt="img"></img>
            </div>

        </div>
    );
}

export default Home;