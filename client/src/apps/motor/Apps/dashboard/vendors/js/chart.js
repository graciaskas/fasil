import React  from "react";
import { Line } from "react-chartjs-2";

export default function Chart (props) {
    const {name,data_entries} = props;
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: "Foods",
          backgroundColor: 'transparent',
          borderColor: 'rgba(220,53,69,0.75)',
          borderWidth: 3,
          pointStyle: 'circle',
          pointRadius: 5,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'rgba(220,53,69,0.75)',
          data: [70,20,29,77,54]
        },
        {
          label: "Computers",
          backgroundColor: 'transparent',
          borderColor: 'rgba(220,53,169,0.75)',
          borderWidth: 3,
          pointStyle: 'circle',
          pointRadius: 5,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'rgba(220,53,169,0.75)',
          data: [70,20,29,77,54]
        }
      ],
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          titleFontSize: 13,
          titleFontColor: '#efefefd7',
          bodyFontColor: '#efefefd7',
          backgroundColor: 'rgb(60,60,65)',
          titleFontFamily: 'Poppins',
          bodyFontFamily: 'Poppins',
          cornerRadius: 3,
          intersect: false,
        },
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            fontFamily: 'Poppins',
          },
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false,
              drawBorder: false
            },
            scaleLabel: {
              display: false,
              labelString: 'Month'
            },
            ticks: {
              fontFamily: "Poppins"
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false,
              drawBorder: true
            },
            scaleLabel: {
              display: true,
              textFontColor:'#fff',
              labelString: 'Value',
              fontFamily: "Poppins"

            },
            ticks: {
              fontFamily: "Poppins"
            }
          }]
        },
        title: {
          display: false,
          text: 'Normal Legend'
        }
      }
    }
      
    return (
        <div className="d-mosts-flex">
            <div className="most-h">
                {/*** variable name of compoenent got from props */}
                <h4>{name}</h4>
            </div>
            <div className="most-d" id="no-flex">
              <Line refs="chart" data={data}/>
            </div>
        </div>
    )
}
