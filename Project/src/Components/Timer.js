import "./Timer.css";
import {useState,useRef,useEffect} from "react";
function Home(){

    const [Day,setDays]=useState("00");
    const [Hour,setHour]=useState("00");
    const [Minute,setMinutes]=useState("00");
    const [Second,setSecond]=useState("00");


    let interval=useRef();

    const startTimer=()=>{
        const countDownDate=new Date("July 30 2021 00:00:00").getTime();

        interval=setInterval(()=>{

            const now=new Date().getTime();
            const distance=countDownDate-now;
            

            const days=Math.floor(distance/(1000*60*60*24));

            
            const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
            

            const minutes=Math.floor((distance%(1000*60*60)/(1000*60)));
            
            const seconds=Math.floor((distance%(1000*60))/(1000));
            
            
            if(distance<0){
                clearInterval(interval.current);
            }
            else{
                setDays(days);
                setHour(hours);
                setMinutes(minutes);
                setSecond(seconds);
            }

        },1000);

    };
    useEffect(()=>{
        startTimer();
        return()=>{
            clearInterval(interval);
        };
    });

    return(
        
        <div className="">

                 
            {/* header image */}
            <div className="m-1">
                <img className="w-100" alt="img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/052021/bookshomepage/Online-book-store_PC_header._CB667971553_SY500_.jpg"></img>
            </div>
            <hr className="border border-2 border-dark"></hr>
            
            <section className="timer-container ">
                <section className="timer">
                    <div className="text-center sale">
                        <h2 className="ms-4" >Hurry up !!!  Sale Ends In</h2>
                    
                    
                    </div>
                    <div className="m-5 bg-dark">
                        <section >
                            <p>{Day}</p>
                            <p><small>Days</small></p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{Hour}</p>
                            <p><small>Hours</small></p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{Minute}</p>
                            <p><small>Minutes</small></p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{Second}</p>
                            <p><small>Seconds</small></p>
                        </section>
                    </div>

                </section>
                
            </section>
                
        </div>
                
        
        
    );
}

export default Home;