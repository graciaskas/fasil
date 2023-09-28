import React, { useContext, useCooperativeContext, useEffect, useState} from "react";
import { URI } from "components/motor/api/uri";
import modelCooperative from "../models/model.cooperative";
import axios from "axios";

import { useHistory } from "react-router";
import { getUserInfo } from "components/base/functions/all";
import { AppContext } from "components/motor/context/app.context";
import { resetModel } from "components/base/functions/resetModel";

export const CooperativeContext = React.createContext();

export default function Provider ({ children }) { 

    const history = useHistory();
    const { database, token } = getUserInfo();
    const bearer = "Bearer "+token;
    const { 
        associations,
        getAssociations,
        setAssociations,
        setLoadAssociations,
        setMessage } = useContext(AppContext);


    
    const createCooperative = async () => {
        try {
            fetch(`${URI}/affiliations`,{ method : "POST", headers : { 
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body : JSON.stringify({ modelCooperative, database })
            }).then( response => { 
                return response.json();
            }).then(data => { 
                const { message, type } = data; //destructure response data
                setMessage({ message, type});
                getAssociations(); //Reload data
                //locate to main page
                if(type === "success") { 
                    resetModel(modelCooperative);
                    setTimeout(() => history.push("/motor/cooperatives"), 50)
                }
                //fetch cacth exception
            }).catch( error => {  setMessage({ message : "Error :"+error, type:"danger"}) })
            //catch exception
        } catch (error) { setMessage({ message : "Error :"+error, type:"danger"})}
    };

    const deleteCooperative = async (id) => { 
        try {
           const headers = new Headers();
           headers.append('Authorization', bearer);
           headers.append('database', database);
           const request = await fetch(URI+"/affiliations/"+id, { 
              method: "DELETE", 
              headers
           });
           const response = await request.json();
           const { message, type } = response;
           setMessage({ message, type});
           if(type === "success") { 
                getAssociations(); //load users
                return history.push("/motor/cooperatives"); //locate to users's page
           }
        } catch (error) {  setMessage({ message : "Error :"+error, type : "danger"})}
     };
  

    //Search input handler
    const handleSearch = e => { 
        const search = e.target.value;
        const found = associations.filter(element => element.name.toLowerCase().includes(search));
        if(found.length == 0 || search == null || search == "") return getAssociations();
        setAssociations(found)
    };

    //context values
    const values = { 
        handleSearch,
        createCooperative,
        deleteCooperative
    };

    useEffect(() => { 
        setLoadAssociations(true)
    },[])

    return(
        <CooperativeContext.Provider value = { values }>
            { children }
        </CooperativeContext.Provider>
    )
}