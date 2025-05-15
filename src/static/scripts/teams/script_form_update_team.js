document.getElementById('addDeveloper').addEventListener('click', () => {
    const container = document.getElementById('developersContainer');
    const devHTML = `
        <div class="row mb-2 developer-item">
            <div class="col">
                <input type="email" name="dev_email" class="form-control" placeholder="Email">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger remove-dev">Remover</button>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', devHTML);
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-dev')) {
        e.target.closest('.developer-item').remove();
    }
});

document.getElementById('editTeamForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Função segura para pegar valores
    function getValue(selector) {
        const element = document.querySelector(selector);
        return element ? element.value : null;
    }

    // Coleta os dados com verificações
    const formData = {
        teamName: getValue('#teamName'),
        EmMaster: getValue('input[name="EmMaster"]'),
        EmPOwner: getValue('input[name="EmPOwner"]'),
        dev_email: Array.from(document.getElementsByName('dev_email')).map(input => input.value)
    };

    console.log("Dados coletados:", formData); // Debug

    // Validação básica
    if (!formData.teamName || !formData.EmMaster || !formData.EmPOwner) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    try {
        const response = await fetch('/equipes/atualizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log("Resposta:", result);

        if (result.status) {
            location.reload();
        } else {
            alert("Erro: " + result.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao comunicar com o servidor");
    }
});