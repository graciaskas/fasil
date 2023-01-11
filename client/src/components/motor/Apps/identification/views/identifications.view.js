import React, { useContext } from "react";
import { useLocation } from "react-router";

//**-- Componets */
import IdentificationList from "./identifications.list";
import Grids from  "./identifications.grid";
import { parseUrl } from "query-string";
import Message from "components/base/components/Message";
import { AppContext } from "components/motor/context/app.context";

const IdentificationMain = ({ data }) => { 
    
    const {  search } = useLocation();
    const { query } = parseUrl(search);
    const { message, setMessage } = useContext(AppContext);
    
    let isViewType = query.viewType ? true : false;
    let viewType = 'grid';

    if(isViewType) viewType  = query.viewType; 
    
    
    if(viewType === "list") return (
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main-container bg-white">
                <Message message={message.message} type={message.type} handler={setMessage}/>
                <IdentificationList data={ data } /> 
            </div>
        </div>
    )
    
    return(
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main-container bg-gray">
                <Message message={message.message} type={message.type} handler={setMessage}/>
                <div className="container-grids">
                    <Grids data= { data } />
                </div>
            </div>
        </div>
    )
}

export default IdentificationMain