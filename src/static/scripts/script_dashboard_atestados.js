google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Mês', 'Quantidade'],  
        ['Janeiro', dados[3][0]],  
        ['Fevereiro', dados[3][1]],  
        ['Março', dados[3][2]],  
        ['Abril', dados[3][3]],  
        ['Maio', dados[3][4]],  
        ['Junho', dados[3][5]],  
        ['Julho', dados[3][6]],  
        ['Agosto', dados[3][7]],  
        ['Setembro', dados[3][8]],  
        ['Outubro', dados[3][9]],  
        ['Novembro', dados[3][10]],  
        ['Dezembro', dados[3][11]]
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
