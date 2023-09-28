import React from 'react';
import { LinearScale } from 'chart.js';
import { options } from '../data/data';
import { 
  Line, 
  Bar, 
  Bubble, 
  Doughnut,
  Pie,
  HorizontalBar,
  Scatter } from 'react-chartjs-2';

import { 
  FaBiking, 
  FaBook, 
  FaHouseDamage,  
  FaUsers } from 'react-icons/fa';



const dataChart = { 
    labels: ["Odoo","Sap","ZeSlap"],
    datasets: [{
        label: "Foods",
        backgroundColor: 'transparent',
        borderColor: 'rgba(220,53,69,0.75)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'rgba(220,53,69,0.75)',
        data: [1.5,5,4]
    }, {
        label: "Computers",
        backgroundColor: 'transparent',
        borderColor: 'rgba(220,53,169,0.75)',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'rgba(220,53,169,0.75)',
        data: [12,20,29]
    }],
}

const Icon = ({ name }) => { 
    if(name === 'motard') return <FaUsers />;
    if(name === 'association') return <FaHouseDamage />;
    if(name === 'moto') return <FaBiking />;
    if(name === 'identification') return <FaBook />;
    return null;
};

const Chart = ({ chartype, data, options }) => { 
  if(chartype === 'line') return <Line data={data} options={options}/>;
  if(chartype === 'bar') return <Bar data={data} options={options}/>;
  if(chartype === 'bubble') return <Bubble data={data} options={options}/>;
  if(chartype === 'doughnut') return <Doughnut data={data} options={options}/>;
  if(chartype === 'pie') return <Pie data={data} options={options}/>;
  if(chartype === 'scatter') return <Scatter data={data} options={options}/>;
  if(chartype === 'horizontal') return <HorizontalBar data={data} options={options}/>;
  return null;
};

const Dmost = (props) => {

    const { 
        name, 
        title,
        chartype, 
        data, 
        chartname } = props;
  
    let thisMonth = 0;
    let thisYear  = 0;

    if(data.length) { 
        thisMonth = data[0].thisMonth;
        thisYear  = data[0].thisYear;
    }

    return(
        <>
           <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="d-most">
                    <div className="most-h">
                        <span><Icon name={name}/></span>
                        <h4>{title}</h4>
                    </div>
                    <div className="most-divider"> </div>
                        
                    <div className="most-d">
                        <div className="d-bl">
                            <h4>200 789</h4>
                            <p>This month</p>
                        </div>
                        <div className="d-bl text-right">
                            <h4>200 789</h4>
                            <p>This Year</p>
                        </div>
                    </div>

                    <div className="most-d" id="no-flex">
                        <Chart 
                          data={dataChart} 
                          options={options}
                          chartype={chartype}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dmost; 