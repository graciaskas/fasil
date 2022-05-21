export  function drawChart(element, data) {
    if (element) {
        var ctx = element.getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: data.type,
            responsive: true,
            // The data for our dataset
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Foods",
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(220,53,69,0.75)',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'rgba(220,53,69,0.75)',
                    data: data.data
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
                }]
            },
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
        });
        // chart.canvas.parentNode.style.height = '180px';
        // chart.canvas.parentNode.style.width = '360px';
    }
}