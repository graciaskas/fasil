import React from "react";
import Table from "components/base/components/Table";

const Columns = ["id","Noms","login","email","Accèss","Dernière connexion","status"];


const UsersList = ({ columns, data }) => { 

   const rows = data.length ? [...data] : [];
   const getRowData = function() { 
       const data = [];
       if(rows.length) { 
           rows.forEach( (record, i) => { 
               const row  = [];
               row.push([i + 1,record.id]);
               row.push(record.name);
               row.push(record.username);
               row.push(record.email);
               row.push(record.role);
               row.push(record.lastLogin);
               row.push(record.active ? "active" : "inactive");
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
                   columns={Columns}
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

export default UsersList