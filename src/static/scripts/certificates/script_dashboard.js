google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

window.onload = function(){
  construirTabelaCids();
  setarFiltroPadraoMesAtual();
  construirTabelaCids();
  atualizarContadores();
};

function setarFiltroPadraoMesAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth(); // 0-11

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0); // dia 0 do próximo mês = último dia do mês atual

  // Formatar como yyyy-mm-dd
  const formatarData = (data) => data.toISOString().split('T')[0];

  document.getElementById('data-filtro-inicio').value = formatarData(primeiroDia);
  document.getElementById('data-filtro-fim').value = formatarData(ultimoDia);
  document.getElementById('selectAno').value = ano;
}
// Função principal que chama os gráficos necessários
function drawCharts() {
  drawMensalChart();
  drawCidsChart();
};

let estadoSelecionado;

function filtrarAtestados(estadoAtestados) {
  var atestadosFiltrados = [];

  if (estadoAtestados == 'afastados') {
    for (var i = 0; i < estado['afastados'].length; i++){
      atestadosFiltrados.push(estado['afastados'][i])
    }
    return atestadosFiltrados
  }
  
  else {
    dataInicio = document.getElementById('data-filtro-inicio').value;
    dataFim = document.getElementById('data-filtro-fim').value;

    const atestados = Object.values(estado[estadoAtestados]);
    for (var i = 0; i < atestados.length; i++) {
      const atestado = atestados[i]
      var inicio = new Date(dataInicio)
      var fim = new Date(dataFim)

      var dataAtestado = new Date(atestado[5])

      if (dataAtestado >= inicio && dataAtestado <= fim) {
        atestadosFiltrados.push(atestado)
      }
      
    }
  }
  return atestadosFiltrados
};

function atualizarContadores() {
  numAfastados = estado['afastados'].length
  numPendentes = filtrarAtestados('pendentes').length
  numAprovados = filtrarAtestados('aprovados').length
  numRejeitados = filtrarAtestados('rejeitados').length

  document.getElementById('num-afastados').innerHTML = numAfastados
  document.getElementById('num-pendentes').innerHTML = numPendentes
  document.getElementById('num-aprovados').innerHTML = numAprovados
  document.getElementById('num-rejeitados').innerHTML = numRejeitados


  return {'afastados': numAfastados, 'pendentes': numPendentes, 'aprovados': numAprovados, 'rejeitados': numRejeitados}
};

document.getElementById('data-filtro-inicio').addEventListener('change', function() {
  atualizarFiltragem();
});
document.getElementById('data-filtro-fim').addEventListener('change', function() {
  atualizarFiltragem();
});

function atualizarFiltragem() {
  atualizarContadores();
  construirTabelaAtestados(estadoSelecionado);
};

function construirTabelaAtestados(estadoAtestados) {
  var table = document.getElementById('tabela-atestados')
  // Limpa todas as linhas da tabela, exceto o cabeçalho
  table.innerHTML = ''
  estadoAtestados = estadoAtestados
  atestadosFiltrados = filtrarAtestados(estadoAtestados)

  for (var i = 0; i < Object.keys(atestadosFiltrados).length; i++) {
    var row =   `<tr>
                  <td>${i+1}</td>
                  <td>${ atestadosFiltrados[i][0] }</td>
                  <td>${ atestadosFiltrados[i][2] }</td>
                  <td>${ atestadosFiltrados[i][5] }</td>
                  <td>${ atestadosFiltrados[i][6] }</td>
                </tr>`
    table.innerHTML += row
  }
  
};

function mostrarTabela(){
  const botao = event.currentTarget;
  var estado_botao = botao.dataset.id;
  document.getElementById('alerta').style.display = 'none';
  var num_afastados = atualizarContadores()[estado_botao]
  const cabecalhoTexto = {afastados: 'Pessoas Afastadas', pendentes: 'Atestados Pendentes', aprovados: 'Atestados Aprovados', rejeitados: 'Atestados Rejeitados'}
  const cabecalho = document.getElementById('titulo-tabela')
  var card = document.getElementById('painel-atestados');
  if (num_afastados > 0){
    cabecalho.innerHTML = cabecalhoTexto[estado_botao]
    card.style.display = 'block';
    estadoSelecionado = estado_botao
    construirTabelaAtestados(estado_botao)
  }
  else {
    document.getElementById('alerta').style.display = 'block';
    fecharTabela()
    mostrarAlerta(cabecalhoTexto[estado_botao] + ' não encontrado.');
}};
const botoes_estado = document.querySelectorAll('.botao-estado');

botoes_estado.forEach(btn => {
  btn.addEventListener('click', mostrarTabela)
});


function fecharTabela () {
var card = document.getElementById('painel-atestados');
card.style.display = 'none';
}

document.getElementById('botao-x').addEventListener('click', function() {
  fecharTabela()
})

function mostrarAlerta(texto) {
  alertaLocal = document.getElementById('alerta');

  alertaLocal.innerHTML = ''
  // Cria o elemento do alerta
  var alerta = document.createElement('div');
  alerta.className = 'alert alert-warning alert-dismissible fade show';
  alerta.role = 'alert';
  alerta.innerHTML = `
    <strong>Erro!</strong>
    ${texto}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Adiciona o alerta ao corpo
  alertaLocal.appendChild(alerta);

  // Remove o alerta após 5 segundos
  setTimeout(function() {
    alerta.remove();
  }, 2000);
}


// Redesenha os gráficos quando a janela for redimensionada
window.addEventListener('resize', drawCharts);

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
        bar: { groupWidth: '50%'},
        chartArea: { width: '80%', height: '70%' },
        vAxis: {
          gridlines: { count: 5, color: 'rgb(11, 43, 64)' }
        },
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

function filtroCids() {
  const dataInicio = document.getElementById('data-filtro-inicio').value;
  const dataFim = document.getElementById('data-filtro-fim').value;

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);

  const cidsAtualizados = {};

  for (const [codigo, cid] of Object.entries(cids)) {
    let countData = 0;
    const datas = cid[3]; // Lista de datas

    for (let i = 0; i < datas.length; i++) {
      const dataAtual = new Date(datas[i]);
      if (dataAtual >= inicio && dataAtual <= fim) {
        countData++;
      }
    }

    cidsAtualizados[codigo] = [cid[0], countData, cid[2], cid[3]];
  }

  const cidsOrdenadas = Object.entries(cidsAtualizados)
    .filter(([_, cid]) => cid[1] > 0)
    .sort((a, b) => b[1][1] - a[1][1]);

  const resultadoOrdenado = {};
  for (const [codigo, cid] of cidsOrdenadas) {
    resultadoOrdenado[codigo] = cid;
  }

  return resultadoOrdenado;
}

function construirTabelaCids() {
  const cidsFiltradas = filtroCids();
  const tbody = document.getElementById('tabela-cids-body');
  const thead = document.getElementById('tabela-cids-head');
  tbody.innerHTML = "";
  thead.innerHTML = "";
  if (Object.keys(cidsFiltradas).length > 0) {
    const cabecalho = `<tr>
                        <th></th>
                        <th>Qtd.</th>
                        <th>CID</th>
                        <th>Descrições</th>
                      </tr>`
    thead.innerHTML = cabecalho;

    let i = 1;
    for (const codigo in cidsFiltradas) {
      const [indice, count, descricao] = cidsFiltradas[codigo];
      const row = `<tr>
                    <td style="font-size: 20px;">${i}°</td>
                    <td>${count}</td>
                    <td>${codigo}</td>
                    <td>${descricao}</td>
                  </tr>`;
      tbody.innerHTML += row;
      i++;
    }
  } else {
    thead.innerHTML = `<tr><td colspan="3">Nenhum CID encontrado.</td></tr>`;
  }
}


document.getElementById('data-filtro-inicio').addEventListener('change', function() {
  drawCharts();
  construirTabelaCids();
});
document.getElementById('data-filtro-fim').addEventListener('change', function() {
  drawCharts();
  construirTabelaCids();
});

function drawCidsChart() {

  const cidsFiltradas = filtroCids();

  const chartData = [[cidsFiltradas, 'Quantidade']];

  const sortedCids = Object.keys(cidsFiltradas).sort((a, b) => cidsFiltradas[a][0] - cidsFiltradas[b][0]);

  const pieChartContainer = document.getElementById('cids_chart');
  const msgSemDados = document.getElementById('cids-sem-dados');
  const card = document.getElementById('card-body-cids');
  const cid_descricoes_card = document.getElementById('cids-descricoes');
  const cid_ver_detalhes = document.getElementById('botao-detalhes-cids');

  card.style.display = 'flex';
  cid_descricoes_card.style.display = 'block';
  cid_ver_detalhes.style.display = 'block';
  pieChartContainer.style.display = 'block';
  msgSemDados.style.display = 'none';
  if (Object.keys(cidsFiltradas).length <= 0) {
    card.style.display = 'none';
    pieChartContainer.style.display = 'none';
    msgSemDados.style.display = 'block';
    cid_ver_detalhes.style.display = 'none';
    fecharCidsDescricoes();
    return;
  }

  let i = 1;
    sortedCids.forEach((codigo) => {
      chartData.push([`${i}° - ${codigo} (${cidsFiltradas[codigo][1]})`, cidsFiltradas[codigo][1]]);
      i++;
    });

    // Converter para formato do Google Charts
    const data = google.visualization.arrayToDataTable(chartData);

    // Configuração do gráfico
    const options = {
        title: '',
        chartArea: { width: '100%', height: '95%'},
        pieHole: 0.4,
        legend: { position: 'right', alignment: 'center' },
        pieSliceText: 'percentage'
  };

  // Criar e desenhar o gráfico no elemento com id "piechart"
  const chart = new google.visualization.PieChart(document.getElementById('cids_chart'));
  chart.draw(data, options);
}


document.getElementById('botao-detalhes-cids').addEventListener('click', function() {
  var card = document.getElementById('cids-descricoes');
  if (card.style.display === 'none') {
    card.style.display = 'block';
  } else {
    fecharCidsDescricoes();
  }
});

function fecharCidsDescricoes() {
  var card = document.getElementById('cids-descricoes');
  card.style.display = 'none';
}

document.getElementById('botao-x-cids').addEventListener('click', function() {
  fecharCidsDescricoes();
});