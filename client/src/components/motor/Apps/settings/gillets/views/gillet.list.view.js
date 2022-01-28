import React from "react";
import Table from "components/base/components/Table";


const GilletsList = ({ columns, data }) => { 

   const rows = data.length ? [...data] : [];
   
   const getRowData = function() { 
       const data = [];

       if(rows.length) { 
           rows.forEach( (record, i) => { 
               const row  = [];
               row.push([i + 1,record.id]);
               row.push(record.num);
               row.push(record.image);
               row.push(record.motard);
               row.push(record.province);
               row.push(record.commune);
               row.push(record.association);
               row.push(record.state);
               data.push(row)
           });
       }

       return data;
   };
   // console.log(getRowData());
   return(
       <div className="bodyContainer" id="bodyContainer">
           <div id="action_bar" style={{display:"none"}}></div>
           <div className="main-container" id="main_container">
               <Table 
                   columns={columns}
                   rows={getRowData()}
                   viewOnly={true}
                   inputable={false}
                   colgroup={[]}
                   margin={true}
               />
           </div>
       </div>
   );
};

export default GilletsList;