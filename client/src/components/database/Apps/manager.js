import React,{ useContext, useEffect, useState }  from "react";
import { Link, useHistory } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import {  FaClone, FaTrashRestore } from "react-icons/fa";
import { DB_URI } from "components/base/auth/access.token";


import axios from "axios";
import Message from "components/base/components/Message";
import { CoreContext } from "components/base/Context";




export default function DatabaseManager () {

    const [ databases, setDatabases ] = useState([]);
    const [ loadDBs, setLoadDBs] = useState(true);
    const { setMessage, message, setLoading } = useContext(CoreContext);

    const getDatabases = async () => {
        setLoadDBs(true);
        try {
            const { data } = await axios.get(`${DB_URI}/list`);
            if (data.length) setDatabases(data);
            setLoadDBs(false);
        } catch (error) {
            setLoadDBs(false);
            setMessage({
                message: error.message + " :Server not avaible",
                type: "danger"
            });
        }
    };

    const deleteDatabase = async (database) => { 
        setLoading(true);
        const { name } = database;
        try {
            await axios.delete(`${DB_URI}/${name}`);
            setLoadDBs(true);
            setLoading(false);
        } catch (error) {
            setLoadDBs(false);
            setMessage({ message: error.message, type: "danger" });
        }
    };


    //check if any database is selected
    let database = JSON.parse(localStorage.getItem('database'));
    //remove selected database from localStorage
    if(database) localStorage.removeItem("database");

       
                  
    useEffect( () => { 
       if(loadDBs === true) getDatabases();
    }, [loadDBs]);
    
 
    return(
        <>
            <div className="login-container">
                <div className="s-main">
                    <div className="s-container">
                        <div className="head">
                            <h4>Manage databases </h4>
                        </div>
                        <Message message={message.message} type={message.type} handler={setMessage} /> 
                        
                       <div className="" id="db-list">
                        {
                            databases.length ? databases.map( (database,key) => (
                                <div className="db-item" key={key}>
                                    <Link to={`/database/login/?selected=${database.name}&id=${key}`}>
                                        {database.name}
                                    </Link>
                                    <div className="pagination">
                                        <button className="btn bg-blue">
                                            <FaClone />
                                        </button>
                                        <button className="btn btn-info ml-2">
                                            <FaTrashRestore />
                                        </button>
                                        <button 
                                            className="btn btn-danger ml-2" 
                                            onClick = {e => deleteDatabase(database)}>
                                            <RiDeleteBinFill />
                                        </button>
                                    </div>
                                </div>
                            )): null
                        }
                    </div>

                        <div className="buttons" style={{ marginTop:"10px"}}>
                            <Link  to="/database/create" className="mt-2">
                                <button className="btn bg-blue"> Create database </button>
                            </Link>
                            <Link  to="/database/restore" >
                                <button className="btn bg-second ml-2"> Restore database </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}