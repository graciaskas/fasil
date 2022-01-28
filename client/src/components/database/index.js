import React,{useEffect, useState}  from "react";
import { useHistory, Link, useLocation, Route } from "react-router-dom";
import axios from "axios";
import { DB_URI } from "components/base/auth/access.token";
import { getUserInfo } from 'components/base/functions/all';

import CreateDB from "./modals/create_db";
import Message from "components/base/components/Message";
import Loading from "components/base/components/Loading";
import Controller from "./controller";



export const DabaseList = ( { databases }) => { 
    return(
        <div className="" id="db-list">
            {
                databases.length ? databases.map( (database,key) => (
                    <div className="db-item" key={key}>
                        <Link to={`/database/login/?selected=${database.name}&id=${key}`}>
                            {database.name}
                        </Link>
                    </div>
                )): null
            }
        </div>
    );
};


 const DatabaseSelect = () =>  {
    "use strict";

    const [ data, setData ] = useState([]);
    const [display,setDisplay] = useState('none');
    const { pathname } = useLocation();
    const database = JSON.parse(window.localStorage.getItem("database"));
    const history = useHistory();
    const [ loading, setLoading ] = useState(false);

    const [ logError, setLogError ] = useState({
        message : null,
        type : null
    });

    const getData = async () => { 
        setLoading(true)
        try {
            const { data } = await axios.get(`${DB_URI}/list`);
            setData(data);
            if(!data.length) setDisplay("block");
            setLoading(false)
        } catch (error) {
            setLogError({ 
                message : error.message,
                type : "danger"
            });
        }
    }


    useEffect( () => { 
       //Any selected db saved in localStorage
        if(database != null ){
            if(database.name)  { 
                history.push(`./database/login/?selected=${database.name}&id=${database.id}`); 
            }
        } else { 
            getData();  
        }//fetch databases   

    },[]);

  

    return(
        <> {}
            <div className="login-container">
                <div className="s-main">
                    <div className="s-container">
                        <div className="head"><h4>Database selection</h4>  </div>
                        { /****  Components ***/ }
                        {loading ? <Loading /> : null}
                        <Message message={logError.message} type={logError.type} handler={setLogError} absolute={ false }/> 
                        {
                            data.length != 0 ? 
                                <DabaseList databases={data} /> : <CreateDB display={data.length == 0 ? "block" : "none"} />
                        }
                        
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
};

export default DatabaseSelect;