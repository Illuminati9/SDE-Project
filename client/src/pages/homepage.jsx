import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

function HomePage() {

    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "One Tap";
        if(token){
            navigate('/dashboard')
        }
    }, []);
    return (
        <div className="page h-[91vh] flex flex-col justify-center items-center">
        <h1 className="text-center text-white text-4xl font-semibold">
            Discover Seamless Connections with ONETAP
        </h1>
        <p className="text-white text-center text-2xl pt-2">
            Your All-in-One Platform for Effortless Service Connections
        </p>
        <Link to={"/auth"}>
            <button
            type="button"
            className="font-bold py-3 px-4 rounded-full shadow bg-white text-black mt-10 submit"
            >
            <span className="span text-lg">Get Started!</span>
            </button>
        </Link>
        </div>
    );
}

export default HomePage;
