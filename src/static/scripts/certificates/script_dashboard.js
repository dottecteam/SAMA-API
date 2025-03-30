google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

// Função principal que chama os gráficos necessários
function drawCharts() {
    drawMensalChart();
    drawCidsChart();
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
        data.addRow([meses[i], metricas[2][anoSelecionado][i], estilo]);
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

function drawCidsChart() {;

  const chartData = [[cids, 'Quantidade']];

  const sortedCids = Object.keys(cids).sort((a, b) => cids[a][0] - cids[b][0]);

  // Preencher os dados sem a descrição, apenas código e quantidade
  sortedCids.forEach((codigo) => {
    chartData.push([`${cids[codigo][0]}° - ${codigo} (${cids[codigo][1]})`, cids[codigo][1]]);
  });

  // Converter para formato do Google Charts
  const data = google.visualization.arrayToDataTable(chartData);

  // Configuração do gráfico
  const options = {
      title: '',
      chartArea: { width: '100%', height: '100%'},
      pieHole: 0.4,
      legend: { position: 'right', alignment: 'center' },
      pieSliceText: 'percentage'
  };

  // Criar e desenhar o gráfico no elemento com id "piechart"
  const chart = new google.visualization.PieChart(document.getElementById('cids_chart'));
  chart.draw(data, options);
}

// Redesenha os gráficos quando a janela for redimensionada
window.addEventListener('resize', drawCharts);

// Função para esconder todos os cards
function esconderTodosCards() {
    var cards = ['painel-afastados', 'painel-pendentes', 'painel-aprovados', 'painel-rejeitados'];
    cards.forEach(function(cardId) {
      var card = document.getElementById(cardId);
      card.style.display = 'none';
    });
  }
  
  // Evento para o botão 'afastados'
  document.getElementById('botao-afastados').addEventListener('click', function() {
    esconderTodosCards();
    var card = document.getElementById('painel-afastados');
    // Alterna entre mostrar e esconder o card
    if (card.style.display === 'none') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Evento para o botão 'pendentes'
  document.getElementById('botao-pendentes').addEventListener('click', function() {
    esconderTodosCards();
    var card = document.getElementById('painel-pendentes');
    // Alterna entre mostrar e esconder o card
    if (card.style.display === 'none') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Evento para o botão 'aprovados'
  document.getElementById('botao-aprovados').addEventListener('click', function() {
    esconderTodosCards();
    var card = document.getElementById('painel-aprovados');
    // Alterna entre mostrar e esconder o card
    if (card.style.display === 'none') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Evento para o botão 'rejeitados'
  document.getElementById('botao-rejeitados').addEventListener('click', function() {
    esconderTodosCards();
    var card = document.getElementById('painel-rejeitados');
    // Alterna entre mostrar e esconder o card
    if (card.style.display === 'none') {
      card.style.display = 'block';
    } else {
      esconderTodosCards();
    }
  });
  
  document.querySelectorAll('.botao-x').forEach(botao => {
    botao.addEventListener('click', function() {
        esconderTodosCards();
    });
});

document.getElementById('botao-detalhes-cids').addEventListener('click', function() {
  var card = document.getElementById('cids-descrissoes');
  if (card.style.display === 'none') {
    card.style.display = 'block';
  } else {
    card.style.display = 'none';
  }
});

document.getElementById('botao-x-cids').addEventListener('click', function() {
  var card = document.getElementById('cids-descrissoes');
  card.style.display = 'none';
});