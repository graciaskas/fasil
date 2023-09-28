export const options =  {
    responsive: true,
    tooltips: {
      mode: 'index',
      titleFontSize: 13,
      titleFontColor: '#fff',
      bodyFontColor: '#fff',
      backgroundColor: 'rgb(60,60,65)',
      titleFontFamily: 'San Francisco',
      bodyFontFamily: 'San Francisco',
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: 'San Francisco',
      },
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: true,
          drawBorder: true
        },
        scaleLabel: {
          display: false,
          labelString: 'Month'
        },
        ticks: {
          fontFamily: 'San Francisco'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: true,
          drawBorder: true
        },
        scaleLabel: {
          display: true,
          textFontColor:'#fff',
          labelString: 'Value',
          fontFamily: 'San Francisco'

        },
        ticks: {
          fontFamily: 'San Francisco'
        }
      }]
    },
    title: {
      display: false,
      text: 'Normal Legend'
    }
};


function max (arrayItems) { 
    if(!typeof arrayItems == "object") return
    let sortedAcendent = arrayItems.sort( (a,b) => b - a);
    return sortedAcendent[0];
}
    
let defaultColumns = [
    "Nom et post nom",
    "Sexe",
    "Lieu et date de naissance",
    "Profession",
    "Nationalité",
    "Observations"
]

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