import React, { useEffect, useState } from "react";
import Loading from "components/Loading";

export const CoreContext = React.createContext();

const parseJwt = (token) => {
   try {
      return JSON.parse(atob(token.split(".")[1]));
   } catch (e) {
      return null;
   }
};

const CoreContextProvider = ({ children }) => {
   const [token, _setToken] = useState(localStorage.getItem("fasilUser"));
   const [user, setUser] = useState(parseJwt(token));
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState({
      message: null,
      type: null,
   });
   const [db, setDb] = useState(window.localStorage.getItem("current_db"));

   const setToken = (token) => {
      if (token) {
         _setToken(token);
         localStorage.setItem("fasilUser", token);
         return;
      }
      localStorage.removeItem("fasilUser");
   };

   useEffect(() => {
      setUser(parseJwt(token));
   }, []);

   useEffect(() => {
      setUser(parseJwt(token));
   }, [token]);

   // userInfos_()
   const values = {
      loading,
      setLoading,
      message,
      setMessage,
      db,
      user,
      setDb,
      setUser,
      token,
      setToken,
   };

   return (
      <CoreContext.Provider value={values}>
         {children}
         {loading ? <Loading /> : null}
      </CoreContext.Provider>
   );
};

export default CoreContextProvider;
