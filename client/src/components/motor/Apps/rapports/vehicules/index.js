import React, { useMemo } from "react";
import { Link, Route, useHistory } from "react-router-dom";

import Search from "components/base/components/Search";
import { AppContext } from "components/motor/context/app.context";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { parseUrl } from "query-string";
import VehiculeGrids from "./views/vehicules.grid.view";
import VehiculesList from "./views/vehicules.list.view";
import Message from "components/base/components/Message";
import VehiculeGeo from "./views/vehicule.geo.view";
import { VehiculeContext } from "./contexts/vehicules.context";


const filters = [ 
   { name : "Model", value: "model"   },
   { name : "Marque", value: "marque" },
   { name: "Moteur", value: "moteur"  },
   { name: "Plaque", value: "plaque"  }
]

/**
 * View Selector Component
 * @param {*} param0 
 * @returns React component
 */
const ViewSelector = ({ data, viewType, load, state }) => { 
   //Return Grids view
   if(viewType === "grid") return <VehiculeGrids data={data} load={load} state={state}/>
   // Return Table view
   if(viewType === "list") return <VehiculesList data={data}/>
   //Default return Grids view
   return <VehiculeGrids data={data} load={load} state={state}/>
};


const Vehicules = props => { 
   
   const { location } = useHistory();
   const { search } = location;
   const { query } = parseUrl(search);
   const { viewType } = query;

   const { getEngines, message, setMessage } = useContext(AppContext);
   const { engines, setEngines } = useContext(VehiculeContext);

   const [ loadEngines, setLoadEngines ] = useState(false);

   const enginesMemo = useMemo(() => engines, [engines]);
   const viewMemo = useMemo(() => viewType, [viewType]);

   useEffect(() => { //When componet is mounted
      getEngines(setEngines); // get engines
   },[]);

   useEffect(() => { //When request for reload data from server
      getEngines(setEngines);
   },[loadEngines]);

   return(
      <div className="page" id="page">
         <div className="headPage" id="AppHeaderPage">
            <div className="headPageTitle">
               <h4>
                  <Link to="/motor/rapports/vehicules">
                     <span className="link">Rapports / Vehicules</span>
                  </Link>
               </h4>

               <div className="buttons " id="myButtons"></div>
            </div>

            <Search 
               viewType="both" 
               data= {[]} 
               location= {location} 
               filters = {filters} 
               searching={true}
               context={VehiculeContext} 
            />
         </div> {/************************************** End PageHeader */}

         <Route path={"/motor/rapports/vehicules"} exact>
            <div className="bodyContainer" id="bodyContainer" >
               <div id="action_bar" style={{ display: "none" }}></div>
               <div className="main-container bg-gray" id="main_container" >
                  <Message message={message.message} type={message.type} handler={setMessage}/>
                  <ViewSelector data={enginesMemo} viewType={viewMemo} load={setLoadEngines} state={loadEngines}/>
               </div>
            </div> {/************************************** End BodyContainer */}
         </Route>

         <Route path={"/motor/rapports/vehicules/view"} exact>
            <VehiculeGeo />
         </Route>


      </div>
   );
};

export default Vehicules;