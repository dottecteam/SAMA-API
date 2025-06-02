$('#form-avaliacao').submit(function (event) {
    event.preventDefault();
    let form = this;
    let evaluations = new FormData(form);
    $.ajax({
        type: 'POST',
        url: '/equipes/avaliacoes/avaliar',
        data: evaluations,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.status) {
                $("#modal-success").modal('show');
                $('#success-message').html(response.message);
            } else {
                $("#modal-error").modal('show');
                $('#error-message').html(response.message);
            }
        },
        error: function (xhr, status, error) {
            $("#modal-error").modal('show');
            var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
            var errorMessage = response.message;
            $('#error-message').html(errorMessage);
        },
    })
});
// Função genérica para atualizar qualquer slider e span
function atualizarSlider(sliderId, inputId) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);
  if (slider && input) {
    const valPercent = (slider.value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    input.value = slider.value;
  }
}

function InputAtualizarSlider(slider) {
  if (slider.type !== 'range') return;
  if (slider.type === 'range') {
    const min = 0;
    const max = 3;
    const val = slider.value;
    const percent = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #3264fe ${percent}%, #d5d5d5 ${percent}%)`;
  }
}


// Scrum Master
function proativ_master_nota() { atualizarSlider("proativ_slider", "proativ_input"); }
function autonomia_master_nota() { atualizarSlider("auto_slider", "auto_input"); }
function colab_master_nota() { atualizarSlider("colab_slider", "colab_input"); }
function entrega_master_nota() { atualizarSlider("entrega_slider", "entrega_input"); }

// Product Owner
function proativ_po_nota() { atualizarSlider("proativ_po_slider", "proativ_po_input"); }
function autonomia_po_nota() { atualizarSlider("auto_po_slider", "auto_po_input"); }
function colab_po_nota() { atualizarSlider("colab_po_slider", "colab_po_input"); }
function entrega_po_nota() { atualizarSlider("entrega_po_slider", "entrega_po_input"); }

// Desenvolvedores 
function inicializarSlidersDevs(qtdDevs) {
  for (let i = 0; i < qtdDevs; i++) {
    atualizarSlider(`proativ_dev_slider_${i}`, `proatividade_dev_val_${i}`);
    atualizarSlider(`entrega_dev_slider_${i}`, `entrega_dev_val_${i}`);
    atualizarSlider(`comm_dev_slider_${i}`, `comunicacao_dev_val_${i}`);
    atualizarSlider(`coop_dev_slider_${i}`, `coop_dev_val_${i}`);
  }
}

// Função para clonar divs de avaliação de devs
function criarAvaliacoesDevs(qtdDevs, devsInfo = []) {
  const container = document.getElementById('developersContainer');
  container.innerHTML = ''; 

  const labels = ['Proatividade', 'Entrega', 'Comunicação', 'Cooperação'];

  for (let i = 0; i < qtdDevs; i++) {
    const devName = devsInfo[i]?.nome || `Dev ${i + 1}`;
    const devId = devsInfo[i]?.devId;
    const devDiv = document.createElement('div');
    devDiv.className = 'container bg-light p-4 mb-4 rounded';

    const evaluationsTypes = {proatividade: 'Proatividade', autonomia: 'Autonomia', colaboracao: 'Colaboração', entrega: 'Entrega'}
    devDiv.innerHTML = `
            <h2 class="input-title">Developer ${i + 1}</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group p-2">
                        <label>Nome do Developer:</label>
                        <span class="form-control">${devName}</span>
                    </div>
                </div>
                <div class="col-md-6 d-flex flex-wrap">
                    <div class="row w-100">
                    ${['proatividade', 'autonomia'].map(label => `
                            <div class="form-group p-2 col-6">
                                <label>${evaluationsTypes[label]}:</label>
                                <div class="d-flex align-items-center gap-1">
                                    <input type="range"
                                        min="0" max="3" step="0.1" value="0"
                                        class="slider sync-slider"
                                        id="${label}_dev_slider_${i}"
                                        data-target="${label}_dev_input_${i}"
                                        oninput="atualizarSlider('${label}_dev_slider_${i}', '${label}_dev_input_${i}')">
                                    <input type="number"
                                        min="0" max="3" step="0.1" value="0"
                                        id="${label}_dev_input_${i}"
                                        name="${devId}_${label}"
                                        class="form-control text-center sync-input"
                                        style="width: 60px"
                                        oninput="document.getElementById('${label}_dev_slider_${i}').value = this.value">
                                </div>
                            </div>
                    `).join('')}
                        </div>
                      <div class="row w-100">
                    ${['colaboracao', 'entrega'].map(label => `
                            <div class="form-group p-2 col-6">
                                <label>${evaluationsTypes[label]}:</label>
                                <div class="d-flex align-items-center gap-1">
                                    <input type="range"
                                        min="0" max="3" step="0.1" value="0"
                                        class="slider sync-slider"
                                        id="${label}_dev_slider_${i}"
                                        data-target="${label}_dev_input_${i}"
                                        oninput="atualizarSlider('${label}_dev_slider_${i}', '${label}_dev_input_${i}')">
                                    <input type="number"
                                        min="0" max="3" step="0.1" value="0"
                                        id="${label}_dev_input_${i}"
                                        name="${devId}_${label}"
                                        class="form-control text-center sync-input"
                                        style="width: 60px"
                                        oninput="document.getElementById('${label}_dev_slider_${i}').value = this.value">
                                </div>
                            </div>
                    `).join('')}
                    </div>
                </div>
            </div>
        `;
    container.appendChild(devDiv);
  }

  inicializarSlidersDevs(qtdDevs);
}


var devsInfo = JSON.parse($("#form-avaliacao")[0].dataset.devs);
let qtdDevs = devsInfo.length

window.addEventListener("DOMContentLoaded", () => {
  proativ_master_nota();
  autonomia_master_nota();
  colab_master_nota();
  entrega_master_nota();
  proativ_po_nota();
  autonomia_po_nota();
  colab_po_nota();
  entrega_po_nota();

  document.getElementById("proativ_slider")?.addEventListener("input", proativ_master_nota);
  document.getElementById("auto_slider")?.addEventListener("input", autonomia_master_nota);
  document.getElementById("colab_slider")?.addEventListener("input", colab_master_nota);
  document.getElementById("entrega_slider")?.addEventListener("input", entrega_master_nota);

  // Product Owner
  document.getElementById("proativ_po_slider")?.addEventListener("input", proativ_po_nota);
  document.getElementById("auto_po_slider")?.addEventListener("input", autonomia_po_nota);
  document.getElementById("colab_po_slider")?.addEventListener("input", colab_po_nota);
  document.getElementById("entrega_po_slider")?.addEventListener("input", entrega_po_nota);
  // Se houver devs, clona as divs de avaliação
  if (qtdDevs > 0) {
    criarAvaliacoesDevs(qtdDevs, devsInfo);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sync-slider').forEach(slider => {
    const input = document.getElementById(slider.dataset.target);
    if (!input) return;


    slider.addEventListener('input', () => {
      input.value = slider.value;
    });


    input.addEventListener('input', () => {
      let val = parseFloat(input.value);
      if (!isNaN(val) && val >= parseFloat(slider.min) && val <= parseFloat(slider.max)) {
        slider.value = val;
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('sync-input')) {
        const input = e.target;
        const sliderId = input.id.replace('_input', '_slider');
        const slider = document.getElementById(sliderId);
        if (slider) {
          slider.value = input.value;
          const valPercent = (slider.value / slider.max) * 100;
          slider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        }
      }
    });

  });
});