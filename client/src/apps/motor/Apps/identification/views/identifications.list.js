import React from "react";
import Table from "components/base/components/Table";

//**-- Data */
const DefaultColumns  = ['N°','Conducteur','Association',"Gillet",'Propriétaire','Type'];

function IdentificationList ({ data }) { 

    const rows = data.length ? [...data] : [];
    
    const getRowData = function() { 
        const data = [];
        if(rows.length) { 
            rows.forEach( (record, i) => { 
                const row  = [];
                let type = 'Taxi'
                if(record.type === 2) type = 'Privé'
                if(record.type === 3) type = 'Entreprise'
                row.push([i + 1,record._id]);
                row.push(record.names);
                row.push(record.affiliation);
                row.push(record.gillet);
                record.isOwner ?  row.push(record.names) :  row.push(record.proprietaire);
                row.push(type);
                data.push(row)
            });
        }
        return data;
    };

   const rowsDataElem = getRowData();

    return(
        <>
            <Table 
                columns={DefaultColumns}
                rows={rowsDataElem}
                inputable={false}
                colgroup={[]}
                margin={true}
            />
        </>
    )
};

export default IdentificationList;
