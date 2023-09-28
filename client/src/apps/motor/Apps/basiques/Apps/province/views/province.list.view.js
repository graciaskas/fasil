import React from "react";
import Table from "components/base/components/Table";

const ProvincesList = ({ columns, data }) => { 
   const rows = data.length ? [...data] : [];
   
   const getRowData = () => { 
       const data = [];
       if(rows.length) { 
           rows.forEach( (record, i) => { 
               const row  = [];
               row.push([i + 1,record.id]);
               row.push(record.nom);
               row.push(record.code);
               row.push(record.cheflieu);
               row.push(record.governor);
               data.push(row)
           });
       }
       return data;
   };

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

export default ProvincesList;