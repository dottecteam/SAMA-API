google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);


function drawCharts() {
    drawMensalChart();
}

function drawMensalChart() {
    var anoSelecionado = document.getElementById("selectAno").value;
    var chartType = window.innerWidth < 510 ? "BarChart" : "ColumnChart";
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var estilo = 'color: rgb(59, 140, 110); opacity: 0.7';
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addColumn({ type: 'string', role: 'style' });

    for (var i = 0; i < meses.length; i++) {
        data.addRow([meses[i], metricas[5][anoSelecionado][i], estilo]);
    }

    var options = {
        title: '',
        legend: { position: 'none' },
        colors: ['rgb(59, 140, 110)'],
        chartArea: { width: '80%', height: '70%' },
        hAxis: {
            title: 'Mês',
            minValue: 0,
            gridlines: { count: 5 }
        }
    };

    var chart = new google.visualization[chartType](document.getElementById('mensal'));
    chart.draw(data, options);

    document.getElementById("selectAno").addEventListener("change", function() {
        anoSelecionado = this.value;
        drawMensalChart();
    });

    document.getElementById("selectAno").value = anoSelecionado;
    document.getElementById("selectAno").style.display = 'block';
}

window.addEventListener('resize', drawCharts);