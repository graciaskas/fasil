import React, { useEffect, useState, } from "react";
import Loading from "./components/Loading";


export const CoreContext = React.createContext();

const Provider = ({ children }) => {
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState({ 
        message : null,
        type : null
    })
    // userInfos_()
    const values = { 
        loading,
        setLoading,
        message,
        setMessage,
    };

    return(
        <CoreContext.Provider value={values}>
            { children }
            { loading ? <Loading /> : null }
       </CoreContext.Provider>
    );
};

export default Provider;