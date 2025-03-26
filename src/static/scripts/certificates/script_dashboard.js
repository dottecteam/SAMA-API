google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

// Função principal que chama os gráficos necessários
function drawCharts() {
    drawMensalChart();
}

// Função responsável por desenhar o gráfico mensal
function drawMensalChart() {
    // Obtém o ano selecionado no seletor de anos
    var anoSelecionado = document.getElementById("selectAno").value;
    
    // Define o tipo de gráfico com base na largura da tela
    var chartType = window.innerWidth < 510 ? "BarChart" : "ColumnChart";
    
    // Lista dos meses do ano
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Estilo das barras do gráfico
    var estilo = 'color: rgb(59, 140, 110); opacity: 0.7';
    
    // Cria uma nova tabela de dados para o gráfico
    var data = new google.visualization.DataTable();
    
    // Adiciona colunas à tabela: uma string (mês), um número (quantidade) e um estilo
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addColumn({ type: 'string', role: 'style' });

    // Adiciona os dados à tabela com base no ano selecionado
    for (var i = 0; i < meses.length; i++) {
        data.addRow([meses[i], metricas[6][anoSelecionado][i], estilo]);
    }

    // Configurações de exibição do gráfico
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

    // Cria o gráfico na div 'mensal' com o tipo de gráfico apropriado
    var chart = new google.visualization[chartType](document.getElementById('mensal'));
    chart.draw(data, options);

    // Adiciona um evento para atualizar o gráfico quando o ano for alterado
    document.getElementById("selectAno").addEventListener("change", function() {
        anoSelecionado = this.value;
        drawMensalChart();
    });

    // Mantém a seleção do ano visível e definida corretamente
    document.getElementById("selectAno").value = anoSelecionado;
    document.getElementById("selectAno").style.display = 'block';
}

// Redesenha os gráficos quando a janela for redimensionada
window.addEventListener('resize', drawCharts);
