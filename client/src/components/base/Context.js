import React, { useContext, useRef, useState, useEffect } from "react";
import { getUserInfo } from "./functions/all";
import { DB_URI } from "./auth/access.token";
import { userInfos } from "./auth/access.token";

export const coreContext = React.createContext();

const Provider = ({ children }) => {

    const header = useRef();
    //**-- GET DOM ELEMENTS */
    const headerPage = useRef();
    const bodyContainer = useRef();
    const actionBar = useRef();
    const mainContainer = useRef();;
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState({ 
        message : null,
        type : null
    })
    // userInfos_()
    const value = { 
        loading, setLoading,
        message, setMessage,
        header, headerPage,
        bodyContainer, actionBar,mainContainer,
    };

    return(
        <coreContext.Provider value = { value }>
            { children }
        </coreContext.Provider>
    );
};

export default Provider;