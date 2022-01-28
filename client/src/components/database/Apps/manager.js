import React,{ useEffect, useState }  from "react";
import { Route, Link, useHistory } from "react-router-dom";
import { RiDeleteBack2Fill, RiDeleteBinFill } from "react-icons/ri";
import { DB_URI } from "components/base/auth/access.token";

import CreateDB from "../modals/create_db";
import RestoreDB from "../modals/restore";
import MasterPwd from "../modals/masterpwd";
import Loading from "components/base/components/Loading";
import Message from "components/base/components/Message";

import axios from "axios";

const DatabaseList = (props) => { 
    const history = useHistory();

    const { databases, loadDBs, setLoadDBs } = props;
    const deleteDatabase = async (e, database) => { 
        e.preventDefault();
        const { name } = database;
        try {
            const { data } = await axios.delete(`${DB_URI}/${name}`);
            history.push("/");
            setLoadDBs(true);
        } catch (error) {
            setLoadDBs(false);
        }
    };

    return(
        <div className="" id="db-list">
            {
                databases.length ? databases.map( (database,key) => (
                    <div className="db-item" key={key}>
                        <Link to={`/database/login/?selected=${database.name}&id=${key}`}>
                            {database.name}
                        </Link>
                        <div className="pagination">
                            <button className="btn bg-blue">
                                <RiDeleteBinFill /> Duplicate
                            </button>
                            <button className="btn btn-info ml-2">
                                <RiDeleteBinFill /> Backup
                            </button>
                            <button 
                                className="btn btn-danger ml-2" 
                                onClick = {e => deleteDatabase(e, database)}>
                                <RiDeleteBinFill />
                            </button>
                        </div>
                    </div>
                )): null
            }
        </div>
    );
};


export default function DatabaseManager () {
    "use strict";

    const [ databases, setDatabases ] = useState([]);
    const [ loadDBs, setLoadDBs] = useState(true);
    const [ display, setDisplay ] = useState('none');

    const [ displayRestore, setDisplayRestore ] = useState('none');
    const [ displayMaster, setDisplayMaster ] = useState('none');
    const [ message, setMessage ] = useState({
        message : null,
        type : null
    });

    const getDatabases = async () => { 
        setLoadDBs(true);
        try {
            const { data } = await axios.get(`${DB_URI}/list`);    
            if(data.length) setDatabases(data);
            setLoadDBs(false);
        } catch (error) {
            setLoadDBs(false);
            setMessage({ 
                message : error.message + " :Server not avaible",
                type : "danger"
            });  
        }
    }

    //check if any database is selected
    let database = JSON.parse(localStorage.getItem('database'));
    //remove selected database from localStorage
    if(database) localStorage.removeItem("database");

    const modalCreate = e => { 
        setDisplay('block');
        const modalCreate = document.getElementById('modal_create');
        const modalCreateBody = document.getElementById('m_body');
        if(modalCreate) {
            modalCreate.style.display = "block"
            modalCreateBody.classList = "modal-body w-40 modal-in"
        }
    };

    const modalRestore = e => {
        setDisplayRestore('block');
        const modalRestore = document.getElementById('modal_restore');
        const modalRestoreBody = document.getElementById('m_body_restore');
        if(modalRestore) {
            modalRestore.style.display = "block"
            modalRestoreBody.classList = "modal-body w-40 modal-in"
        }
    };
       
                  
    useEffect( () => { 
       if(loadDBs == true) getDatabases();
    },[loadDBs]);

  
    return(
        <>

            {/* Modal For Database Creation */}
            <CreateDB state={display} />
            {/* Modal For Database Restoration */}
            <RestoreDB state={displayRestore} />
            {/* Modal For Database Restoration */}
            <MasterPwd state={displayMaster} />

            { loadDBs ? <Loading /> : null }
            
            <div className="login-container">
                <div className="s-main">
                    
                    <div className="s-container">
                        <div className="head">
                            <h4>Manage databases </h4>
                        </div>

                        <Message  message={message.message}  type={message.type} handler={setMessage}/> 

                        <div className="" id="db-list">
                            <DatabaseList 
                                databases = { databases } 
                                loadDBs={loadDBs} 
                                setLoadDBs={setLoadDBs}/>
                        </div>

                        <div className="buttons">
                            <button className="btn bg-blue" onClick={ e => modalCreate(e)}>
                                Create database
                            </button>
                        
                            <button className="btn bg-second ml-2" onClick={ e => modalRestore(e) }>
                                Restore database
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}