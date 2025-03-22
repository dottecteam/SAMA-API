google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawMensalChart();
}

function drawMensalChart() {
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var estilo = 'color: rgb(59, 140, 110); opacity: 0.7';
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addColumn({ type: 'string', role: 'style' });

    for (var i = 0; i < meses.length; i++) {
        data.addRow([meses[i], dados[4][i], estilo]);
    }

    var options = {
        title: '',
        colors: ['rgb(59, 140, 110)'],
        chartArea: {width: '90%'},
        hAxis: {
            title: 'Mês', 
            minValue: 0,
            gridlines: { count: 5 }
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('mensal'));
    chart.draw(data, options);
}

window.addEventListener('resize', drawCharts);