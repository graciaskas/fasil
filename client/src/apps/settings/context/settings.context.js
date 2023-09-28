import React, { useContext } from "react";

export const SettingsContext = React.createContext();

const Provider = ({children}) => { 
   const handleSearch = () => { 

   };

   const value = { 
      handleSearch
   };

   return(<SettingsContext.Provider value={ handleSearch }>
      { children }
   </SettingsContext.Provider>);
};

export default Provider;