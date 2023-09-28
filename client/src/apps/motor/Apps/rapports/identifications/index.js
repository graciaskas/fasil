import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

import Message from "components/base/components/Message";
import Select from "components/base/components/Select";
import LoadingDark from "components/base/components/LoadingDark";
import Datalist from "components/base/components/Datalist";
import Datepicker from "react-day-picker"
import 'react-day-picker/lib/style.css';
// import handlers
import { setDate, setFilterGot, setCommune, setQuartier, setType } from "./handlers/rapport.identifications.handlers";
import rapportIdentificationsModel from "./models/rapport.identifications.model";

import { URI } from "components/motor/api/uri";
import { AppContext } from "components/motor/context/app.context";
import { useContext } from "react/cjs/react.development";
import { communes } from "../../data/communes";
import { quartiers } from "../../data/quartiers";

//Filter selection options
const selection = [ 
   { name: "Toutes", value: "all" }, 
   { name: "Type", value: "type" }, 
];

const types = [
   { name: "Taximan", value: 1 } ,
   { name: "Privé", value: 2 },
   { name: "Mandateur", value: 3}
];


const Identifications = props => {
   
   const { message, setMessage, database, bearer } = useContext(AppContext);
   const [filter, setFilter] = useState(selection[0].value);
   const [printing, setPrinting] = useState(false);
   const [startDate, setStartDate] = useState(null);

   const setFilterSelected = value => {
      setFilterGot(value);
      setFilter(value);
   };

   useEffect(() => {
      console.log(filter, startDate);
   }, [filter, startDate]);
   
   const downloadFile = (event) => {
      try {
         setPrinting(true);
         fetch(`${URI}/report/identifications/?database=${database}`, {
            method: "POST",
            headers: { Authorization: bearer, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: rapportIdentificationsModel, database })
         })
            .then(response => response.blob())
            .then(blob => {
               if (window.navigator && window.navigator.msSaveOrOpenBlob) {
               } else {
                  const file = new window.Blob([blob], { type: 'application/pdf' });
                  const URL = window.URL || window.webkitURL //window.webkitURL works in Chrome and window.URL works in Firefox
                  const url = URL.createObjectURL(file);
                  window.open(url);
                  setPrinting(false);
                  setMessage({ message: null, type: null });
               }
            })
            .catch(error => {  //Fetch Catch exception
               setPrinting(false);
               setMessage({ message: "" + error, type: "danger" })
               console.error(error);
            })
         //Catch exception
      } catch (error) {
         setMessage({ message: "" + error, type: "danger" });
         console.error(error);
      }
   }
   const requestPDF = event => {
     return downloadFile(event);
   };

   return(

      <div className="page" id="page">
         <div className="headPage" id="AppHeaderPage">
            <div className="headPageTitle">
               <h4>
                  <Link to="/motor/rapports/identifications">
                     <span className="link">Rapports / Identifications</span>
                  </Link>
               </h4>
               <div className="buttons" id="myButtons">
                  <a id="downloader" href="" download=""></a>
                  <button className="bg-blue" onClick={requestPDF}>Imprimer</button>
                  <button className="bg-o">Exporter .Xls</button>
               </div>
            </div>
         </div> {/************************************** End PageHeader */}

         <Route path={"/motor/rapports/identifications"} exact>
            { printing &&   <LoadingDark /> }
            <Message message={message.message} type={message.type} handler={setMessage}/>
            <div className="bodyContainer" id="bodyContainer" >
               <div className="main-container bg-sheet">
                  <div id="loaded" className="pageSingle" >
                     <div className="page-container">
                        <form >
                           <div className="pageSingleLinksData" id="infosPubliques" >
                              <div className="singleBlock">
                                 <div className="DataBox">
                                    <div className="DataBoxInputs">

                                       <div className="input">
                                          <div className="label"><p className="icon">Filtre</p></div>
                                          <div className="input_input">
                                             <Select data={selection} item="name" onChange={({value}) => setFilterSelected(value)} className="required"/>
                                          </div>
                                       </div>

                                       {  // if selected filter is quartier display quartier field
                                          filter == "type" ? (
                                             <div className="input">
                                                <div className="label"><p className="icon">Type</p></div>
                                                <div className="input_input">
                                                   <Select data={types} item="name" onChange={({value}) => setType(value)} className="required"/>
                                                </div>
                                             </div>
                                          ): null
                                       }        
                          
                                       <div className="input">
                                          <div className="label"><p className="icon">Commune</p></div>
                                          <div className="input_input">
                                             <Datalist data={communes} item="nom" onChange={(value) => setCommune(value)} />
                                          </div>
                                       </div>
                               
                                       <div className="input">
                                          <div className="label"><p className="icon">Quartier</p></div>
                                          <div className="input_input">
                                             <Datalist data={quartiers} item="nom" onChange={(value) => setQuartier(value)} />
                                          </div>
                                       </div>
                                      
                                    </div>
                                 </div>

                                 <div className="DataBox">
                                    <div className="DataBoxInputs">
                                       <div className="input">
                                          <div className="label">
                                             <p className="icon">Date: </p>
                                             <p style={{marginLeft:"3px"}}>
                                                {startDate && startDate.toLocaleDateString()}
                                             </p>
                                          </div>
                                          <div className="input_input">
                                             <Datepicker 
                                                selectedDays={startDate}
                                                disabledDays={{ daysOfWeek: [0] }} 
                                                onDayClick={(date) => { 
                                                   setDate(date.toLocaleDateString());
                                                   setStartDate(date);
                                                }}
                                             />
                                          </div>
                                       </div>
                                    
                                    </div>
                                 </div>

                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </Route>

      </div>
   );
};

export default Identifications;