import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { DB_URI } from "components/base/auth/access.token";


import Message from "components/base/components/Message";
import { CoreContext } from "components/base/Context";


export default function DatabaseSelect(props) {
    const { setLoading, message, setMessage } = useContext(CoreContext);
   
    const [ data, setData ] = useState([]);
    const history = useHistory();
  

    const getData = async function () {
        try {
            setLoading(true)
            const { data } = await axios.get(`${DB_URI}/list`);
            setData(data);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setMessage({
                message: error.message,
                type: "danger"
            });
        }
    };


    useEffect(function () { 
        //Get database from local if any stored
        const database = JSON.parse(window.localStorage.getItem("database"));
       //if any
        if (database != null) {
            if (database.name) { // if database is an object with name property
                history.push(`/database/login/?selected=${database.name}&id=${database.id}`);
            }
        } else {
            // load databases
            getData().then(data => {
                if (data.length === 0) { // if no database
                   //redirect to create page
                    history.push("/database/create")    
                }
            })
        }
    }, []);

  
    return(
        <div className="login-container">
            <div className="s-main">
                <div className="s-container">
                    <div className="head"><h4>Database selection</h4>  </div>
                    <Message
                        message={message.message}
                        type={message.type}
                        handler={setMessage} absolute={false} 
                    /> 
                    <div className="" id="db-list">
                        {data.map(function (database, key) {
                            return (
                                <div className="db-item" key={key}>
                                    <Link to={`/database/login/?selected=${database.name}&id=${key}`}>
                                        {database.name}
                                    </Link>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

