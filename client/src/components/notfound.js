import React from "react"
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
       
        <>
            <div className="dashboard" style={{ height:"100vh"}}>
                <div className="center">
                    <h1 className="text-white">Page Not found !</h1>
                    <p className="text-center text-white">Either you entered manually the url address.</p>
                    <h1>
                        <code className="text-white">404</code>
                    </h1>
                    <Link to={"/dashboard"}>
                        <button className="bg-o">Back home</button>
                    </Link>
                </div>
            </div>
        
        </>
    )
}
