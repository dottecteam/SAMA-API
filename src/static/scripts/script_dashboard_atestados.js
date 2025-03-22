google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],  
        ['Atestados', dados[0]],  
        ['Aprovados', dados[1]],  
        ['Reprovados', dados[2]]  
    ]);

    var options = {
        title: "Dashboard de Atestados",
        chartArea: {width: '50%'},
        hAxis: {title: 'Quantidade', minValue: 0},
        vAxis: {title: 'Status'}
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
