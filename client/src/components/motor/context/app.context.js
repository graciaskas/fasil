import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Message from "components/base/components/Message";
import Loading from "components/base/components/Loading";
import { getUserInfo } from "components/base/functions/all";
import { URI } from "../api/uri";
import { resetModel } from "components/base/functions/resetModel";
import { CoreContext } from "components/base/Context";

export const AppContext = React.createContext();

const Provider = ({ children }) => { 

   const [ typePersonne, setTypePersonne ] = useState(1);
   //database and token
   const { database, token } = getUserInfo();
   //loading effect state variables
   const { setLoading,loading } = useContext(CoreContext);
   //Message report state variables
   const [ message, setMessage ] = useState({
      message : null,
      type : null
   });
   //Bear token string
   const bearer = "Bearer "+token;

   //**-- App data state variables */
   const [ drivers, setDrivers ] = useState(null);
   const [ loadDrivers, setLoadDrivers ] = useState(false);

   const [ gillets, setGillets ] = useState(null);
   const [ loadGillets, setLoadGillets ] = useState(false);

   const [ associations, setAssociations ] = useState(null);
   const [ loadAssociations, setLoadAssociations ] = useState(false);

   const [ utilisateurs, setUtilisateurs ] = useState(null);
   const [loadUtilisateurs, setLoadUtilisateurs] = useState(false);
   const [provinces, setProvinces] = useState(null);
   


   const getProvinces = async function () {
      try {
         
      } catch (error) {
         
      }
   };


   /**
    * This function is used to fetch gillets from server and returns a state data
    * @param {*} setter setter for a  state variable 
    * @param {*} type gillet type
   */
   const getGillets = async (setter, type) => { 
      try {
         setLoading(true);
         //Type Conditioned request url
         let reqUrl = type ? URI+`/gillets/?database=${database}&type=${type}` : URI+`/gillets/?database=${database}`;
         //Request
         const request  = await fetch( reqUrl ,{ method : "GET",headers : { "Authorization": bearer }});
         const data = await request.json();

         console.log(data);
         if(data.type === "success")  { 
            setGillets(data.result); // Sett data
            if(setter) { 
               setter(data.result);
            }
         }
         setLoading(false)
      } catch (error) {
         setLoading(false);
         setMessage({ message : ""+error, type : "danger" });
      }
   };


   const getAssociations = async () => { 
      setLoading(true);
      try {
         const { data } = await axios.get(`${URI}/affiliations/?database=${database}`, {
            headers: { "Authorization": bearer }
         });
         const { result, message, type } = data
         if (type === "danger") return  setMessage({ message, type });
         setLoading(false);
         setAssociations(result);
      } catch (error) { setMessage({ message : ""+error, type : 'danger' }) }
   };

/**
 * This function is used for fetching data drivers from server
 * if owner is passed, driver is sent with owner's data
 * if engine is passed, driver is sent with engine's data
 * @param {*} setter Setter for setState
 * @param {*} owner owner 
 * @param {*} engine engine
 */
   const getDrivers = async (setter, owner, engine) => {
		try {
			setLoading(true);
         let baseUrl = `${URI}/drivers/?database=${database}`;
         if(owner && !engine) baseUrl += "&owner=true";
         if(!owner && engine) baseUrl += "&engine=true";
         if(owner && engine) baseUrl += "&engine=true&owner=true";
			const { data } = await axios.get(baseUrl, { headers: { Authorization: bearer },});
         const { message, type, result } = data;
         if (type === "danger") setMessage({ message, type });
			//Bind data
         setLoading(false);
         //if success response type
         if (type === "success") {
            setDrivers(result);
            if (setter) setter(result);
         }
      } catch (error) {
         console.error(error);
			setMessage({ message: ""+error, type: "danger" });
		}
	};


   /**
    * This function is used for fetching users
    * @param {*} setter Setter function for updating state of caller component 
    * @returns data ;
    */
   const getUtilisateurs = async (setter) => { 
      try {
			setLoading(true);
			const { data } = await axios.get(URI + '/users/?&database=' + database, { headers: { Authorization: bearer },});
         const { message, type, result } = data;
			setMessage({ message, type }); // UI Message
			setLoading(false); //Close loader
			return  setter ? setter(result) : setUtilisateurs(result); // Return data
		} catch (error) {
         console.error(error);
         setMessage({ message: error.message, type:"danger" }); // UI Message
		}
   };

   /**
    * This function is used for fetching users
    * @param {*} setter Setter function for updating state of caller component 
    * @returns data ;
   */
   const getEngines = async (setter) => { 
      try {
         setLoading(true);
         const { data } = await axios.get(URI + '/engines/?&database=' + database, { headers: { Authorization: bearer },});
         const { result } = data;
         setLoading(false); //Close loader
         return  setter ? setter(result) : result; // Return data
      } catch (error) {
         console.error(error);
         setMessage({ message: error.message, type:"danger" }); // UI Message
      }
   };

   const values = { 
      typePersonne, setTypePersonne, //Driver type
      //Security data
      database, token, bearer,
      //**--- Loading effect */
      loading, setLoading,
      //**--- Drivers data */
      drivers, setDrivers, getDrivers, setLoadDrivers,
      //**--- Messages and alert  */
      message, setMessage,
      //**--- Gillets data */
      gillets, getGillets, setGillets, setLoadGillets,
      //Affiliation data
      associations, setAssociations, getAssociations, setLoadAssociations,
      //**-- Users data */
      utilisateurs, getUtilisateurs, setUtilisateurs,setLoadUtilisateurs,
      getEngines,
   }

   //Effect on associations
   useEffect(() => {
      if( loadAssociations === true ) getAssociations();
   },[  loadAssociations  ]);

   //Effect on drivers
   useEffect(() => {
      if( loadDrivers === true ) getDrivers();
   },[  loadDrivers  ]);

   //Effect on gillets
   useEffect(() => {
      if( loadGillets === true ) getGillets();
   },[  loadGillets  ]);
   
   //Effect on users
   useEffect(() => {
      if( loadUtilisateurs === true ) getUtilisateurs();
   },[  loadUtilisateurs  ]);


   return(<AppContext.Provider value={ values }>
      { loading ? <Loading /> : null }
      { children }
   </AppContext.Provider>)
};

export default Provider;