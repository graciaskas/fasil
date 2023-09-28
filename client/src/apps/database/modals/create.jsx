import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { 
    RiUserFill, 
    RiDatabase2Fill,
    RiBallPenFill,
    RiUser6Fill,
    RiPhoneFill
} from "react-icons/ri";

import { DB_URI } from "components/base/auth/access.token";


import Message from "components/base/components/Message";
import { useHistory } from "react-router";
import { CoreContext } from "components/base/Context";

export default function Create ({ display }) {

    const history = useHistory();

    const [ database, setDatabase ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [number, setNumber] = useState("");
    const { message, setMessage, setLoading } = useContext(CoreContext);
  
    //function to handle submition
    const createDatabase = (e) => {
        e.preventDefault(); 
        setLoading(true);
        if(database === "" || username === "" || password == "" || name == "" || number == "") { 
            return setMessage({ message : "All fields are required !", type : "danger" });
        //fields filled
        } else { 
            setMessage({  message : null, type : null });
            //post create database request
            fetch(`${DB_URI}/create`, { 
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({ database, username, password, name, number })
            })
            .then( res =>  res.json())
            .then(data => {
                setLoading(false);
                setMessage({ message : data.message,type : data.type});
                if(data.type === "success") { 
                    const { database } = data;
                    localStorage.setItem('database',JSON.stringify({ 
                        name : database,
                        id : 1
                    }));
                    history.push(`/database/login/?selected=${database}&id=0`);
                }
            })
            .catch( err => console.log("error :", err))
        }
    };
    
    return(
      
        <div className="login-container">
            <div className="s-main">
                <div className="s-container">
                    <div className="head">
                        <h4>Create Database</h4>
                    </div>
                
                <Message message = { message.message } type = { message.type } handler={setMessage}/>
                <div className="report" id="report_"></div>
                    <form className="form"  onSubmit={(e) => createDatabase(e)}>
                        <div className="form-e">
                            <span className="icon"><RiDatabase2Fill /></span>
                            <input type="text" name="dbname" maxLength="45"
                                placeholder="Database Name"
                                onChange={e => setDatabase(e.target.value)}
                            />
                        </div>

                        <div className="form-e">
                            <span className="icon">
                                <RiUser6Fill />
                            </span>
                            <input type="text" name="name" placeholder="Full name" onChange={ e => setName(e.target.value)}/>
                        </div>

                        <div className="form-e">
                            <span className="icon">
                                <RiUserFill />
                            </span>
                            <input type="text" name="username" maxLength="15"
                                placeholder="Email or username" onChange={e => setUsername(e.target.value)} />
                        </div>

                        <div className="form-e">
                            <span className="icon">
                                <RiBallPenFill/>
                            </span>
                            <input type="password" placeholder="password" maxLength="10" onChange={ e =>  setPassword(e.target.value)}/>
                        </div>

                        <div className="form-e">
                            <span className="icon">
                                <RiPhoneFill />
                            </span>
                            <input type="number" name="name"  maxLength="10" placeholder="Phone" minLength="10" onChange={ e => setNumber(e.target.value)}/>
                        </div>
                    
                        <button type="submit"  className="btn bg-blue">
                            Save 
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}