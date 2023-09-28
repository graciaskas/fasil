import React,{ useContext, useEffect, useState } from "react";
import { parse} from "query-string"
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import { IP_ADDR, DB_URI } from "components/base/auth/access.token";

import { 
    RiUserFill, 
    RiDatabase2Fill,
    RiBallPenFill
} from "react-icons/ri";

import Message from "components/base/components/Message";
import axios from "axios";
import Loading from "components/base/components/Loading";
import { CoreContext } from "components/base/Context";

export default function Login () {

    const history = useHistory();

    const [ database, setDatabase ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const { loading, setLoading, setMessage, message } = useContext(CoreContext);

    const {  pathname, search, hash } = useLocation();
    const searchParsed = parse(search);

    const changeDatabase = e => { 
        e.preventDefault();
        //clear localStorge;
        window.localStorage.clear();
        //Reload
        history.push("/");
    }

    const manageDatabase = e => { 
        e.preventDefault();
        //clear localStorge;
        window.localStorage.clear();
        history.push("/database/manager");
    }

    const postLoginRequest = async () => {
        setLoading(true);
        try {
            const body = JSON.stringify({ username, password, database });
            const options = {  method: "POST",   headers : { "Content-Type" : "application/json"}, body } ;
            const request = await fetch(`${DB_URI}/login/`, options );
            const data = await request.json();
            //-- if user is not found
            setMessage({ message : data.message, type : 'danger' }); 
            setLoading(false); //terminate loading effect
            //-- User is found
            if(data.token) { 
                //store connection data in localStorage
                localStorage.setItem("userConnectionInfo", JSON.stringify({ 
                    loggin : new Date(),
                    response : data
                }));
                //locate to the page
                history.push("/dashboard");
            }
        } catch (error) {
           console.error(error);  
           setMessage({ message : "Internal server error", type : 'danger' });
        } 
    };

    const requestLogin = (e) => { 
        e.preventDefault();
        if(!username || !password) return   setMessage({
            message : "Username or password is required.",
            type : 'danger'
        });
        //-- POST login request
        postLoginRequest(); 
    };


    useEffect( () => { 
        if(searchParsed.id && searchParsed.selected){
            const { selected, id } = searchParsed;
            setDatabase(selected);
            //store db in localStorage
            localStorage.setItem('database',JSON.stringify({ 
                name : selected,
                id : id
            }));
        }
    },[database]);

    return(
   
        <div className="login-container">
            <div className="s-main">
                { loading ? <Loading /> : null }
                <div className="s-container">
                    <div className="head">
                        <h4>Log In</h4>
                    </div>
                    
                    <form className="form" id="form-login" onSubmit={requestLogin}>

                        <Message  message={message.message}  type={message.type} handler={setMessage}/> 
                        <div className="form-e">
                            <span className="icon"> < RiDatabase2Fill />  </span>
                            <input  className="text-center"  disabled  defaultValue={ database }  type="text" name="username"  />
                            <button className="btn bg-o" type="button"  onClick={ changeDatabase }> 
                                Change database 
                            </button>
                        </div>

                            <div className="form-e">
                                <span className="icon">
                                <RiUserFill />
                                </span>
                                <input type="text" name="username" placeholder="Email or username" onChange = { e => setUsername(e.target.value) } />
                            </div>

                        <div className="form-e">
                            <span className="icon">
                                <RiBallPenFill />
                            </span>
                            <input 
                                type="password" 
                                placeholder="password"
                                onChange = { e => setPassword(e.target.value) }
                            />
                        </div>
                        <button type="submit"  className="btn bg-blue"> Connexion </button>
                        {/* 
                         */}
                    </form>
                </div>
            </div>
        </div>
    )
}