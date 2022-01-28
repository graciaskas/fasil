import React, { useEffect } from "react";
import { useState } from "react";
import { 
    RiUserFill, 
    RiDatabase2Fill,
    RiBallPenFill,
    RiUser2Fill,
    RiUser6Fill,
    RiPhoneFill
} from "react-icons/ri";

import { DB_URI } from "components/base/auth/access.token";


import Message from "components/base/components/Message";
import Loading from "components/base/components/Loading";
import { useHistory } from "react-router";

export default function Create_DB ({ display }) {

    const history = useHistory();

    const [ database, setDatabase ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [number, setNumber] = useState("");
    const [ loading, setLoading ] = useState(false);
 

    const [ message, setMessage ] = useState( { 
        message: 'Avoid special characters and white spaces, use _ instead',
        type: 'warning'
    });

 

    const close = function(e){
        e.preventDefault();
        const modalBody =  document.getElementById('m_body');
        const modalCreate = document.getElementById('modal_create');
        //change the modal classList 
        modalBody.classList = "modal-body w-40 modal-out"
        setTimeout(function(){
            modalCreate.style.display = 'none'
        },200);
    };
 
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
                    const { database } = data
                    history.push(`/database/login/?selected=${database}&id=0`);
                }
            })
            .catch( err => console.log("error :", err))
        }
    };
    
    return(
        <React.Fragment>
            { loading ? <Loading /> : null }
            <div className="modal " style={{ display }} id="modal_create">
                <div className="modal-body w-40 modal-in" id='m_body'>
                    <div className="head">
                        <h4>Create Database</h4>
                    </div>
                    
                    <Message message = { message.message } type = { message.type } handler={setMessage}/>
                    <div className="report" id="report_"></div>
                        <form className="form"  onSubmit={(e) => createDatabase(e)}>
                            <div className="form-e">
                                <span className="icon">
                                    <RiDatabase2Fill />
                                </span>
                                <input type="text" name="dbname"maxLength="45" placeholder="Database Name" onChange={ e => setDatabase(e.target.value)}/>
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
                                <input type="text" name="username" maxLength="15" placeholder="Email or username" onChange={ e =>  setUsername(e.target.value)} />
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
                            <button type="button" className="btn bg-second" onClick = {close}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
        </React.Fragment>
    )
}