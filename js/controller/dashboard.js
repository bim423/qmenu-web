/**
 * Controller script for the dashboard
 **/
$(document).ready(function () {
    // TODO: Get stats from API

});

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
        datasets: [{
            label: "Orders",
            lineTension: 0.3,
            backgroundColor: "rgba(255,142,65,0.2)",
            borderColor: "rgba(255,142,65,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(255,142,65,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,142,65,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [2, 25, 39, 65, 124, 348, 662, 670, 480, 370, 428, 312, 108],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 1000,
                    minTicksLimit: 5
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                }
            }],
        },
        legend: {
            display: false
        }
    }
});
// Bar Chart Example
var barChart = document.getElementById("myBarChart");
var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
        datasets: [{
            label: "Revenue",
            backgroundColor: "rgba(255,142,65,1)",
            borderColor: "rgba(255,142,65,1)",
            data: [4215, 5312, 6251, 7841, 9821, 14984, 5423, 6000, 3498, 2312, 4324, 5678, 4324, 4324,6567,7654,5000, 5200, 5400, 6000, 6500,
            6600, 7003, 6900, 7200, 7100, 7400, 7800, 8000, 8200, 8500, 9000],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'month'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 6
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5
                },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
            display: false
        }
    }
})
