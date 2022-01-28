import React from "react";

import CooperativeGrid from "./cooperative.grid.view";
import Message from "components/base/components/Message";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "components/motor/context/app.context";

const CooperativeGrids = ({ data }) => { 

    const { message, setMessage } = useContext(AppContext);

   const appPerRow = 4;
   const rows = Math.ceil(data.length / appPerRow);
   let rowsArray = [];
   let start = 0;
   let end = appPerRow;
   
   //Paginate rows
   for( let i = 0; i < rows ; i++) { 
       rowsArray.push({ row : i, records : ""});
       rowsArray[i].records = data.slice(start,end);
       for (let icon = 0; icon < data.length; icon++) {
           if(icon === appPerRow) { 
               start += appPerRow;
               end += appPerRow;
               continue;
           }
       } 
   }

   return(
        <div className="bodyContainer" id="bodyContainer">
           <div id="action_bar" style={{display:"none"}}></div>
           <div className="main-container bg-gray" id="main_container">
              <Message message={message.message} type={message.type} handler={setMessage} />
               {
                   rowsArray.map( (row,i) => {
                       const rowApps = [...row.records];
                       return(
                           <div className="row" key={i}>
                               {
                                   rowApps.map( (record, i) => {
                                       return(
                                           <CooperativeGrid
                                               key={i}
                                               size={appPerRow}
                                               id={record._id}
                                               image={record.image}
                                               active={record.active}
                                               email={record.email}
                                               motards={record.motards}
                                               president={record.president}
                                               name={record.name}
                                           />
                                       )
                                   })
                               }
                           </div>
                       );
                   })
               }
           </div>
       </div>
   );
};

export default CooperativeGrids;