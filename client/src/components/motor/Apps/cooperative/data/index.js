function max (arrayItems) { 
    if(!typeof arrayItems == "object") return
    let sortedAcendent = arrayItems.sort( (a,b) => b - a);
    return sortedAcendent[0];
}
    
let defaultColumns = [
    "Marque",
    "Model",
    "Lieu et date de naissance",
    "Profession",
    "Nationalité",
    "Observations"
];

export const defColgroup = () => { 

    let colgroup = [];
    let sum = 0;
   
    defaultColumns.filter( colum => { 
        colgroup.push(colum.length);
        sum += colum.length;
    });

    if(sum < 100 && sum > 0 ) { 
        const greatNum = max(colgroup);
        const aLength = colgroup.length;
        let toAdd = ((100 - sum ) + (greatNum - (aLength - 3)) ) / aLength;
        
        for(let i = 0; i < colgroup.length; i++ ){ 
            if(greatNum == colgroup[i]) { 
                continue
            }else { 
                colgroup[i] = colgroup[i] + toAdd;
            } 
        };
    }

    return colgroup;
}


export default defaultColumns;