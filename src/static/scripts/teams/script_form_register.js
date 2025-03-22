$(document).ready(function () {
  let fieldCounter = 0; // Contador para gerar IDs únicos

  // Função para adicionar o novo campo
  $("#addFieldBtn").click(function (event) {
    event.preventDefault(); // Impede o envio do formulário

    fieldCounter++; // Incrementa o contador

    // Criar o elemento div para o novo campo
    const newField = $(`
            <div class="row form-group p-2">
                <div class="col-md-6">
                    <label for="input-nome-form-devteam-${fieldCounter}">Nome do Dev:</label>
                    <input type="text" class="form-control"
                           id="input-nome-form-devteam-${fieldCounter}" 
                           name="input-nome-form-devteam" 
                           placeholder="Nome" required />
                </div>
                <div class="col-md-6">
                    <label for="input-email-form-devteam-${fieldCounter}">Email do Dev:</label>
                    <input type="email" class="form-control"
                           id="input-email-form-devteam-${fieldCounter}" 
                           name="input-email-form-devteam" 
                           placeholder="Email" required />
                </div>
                <div class="col-md-12 d-flex align-items-end mt-2">
                    <button class="btn btn-sm btn-danger removeFieldBtn" aria-label="Remover este campo">Remover</button>
                </div>
            </div>
        `);

    // Adicionar o novo campo ao contêiner
    $("#devFieldsContainer").append(newField);

    // Adicionar a função para remover o campo quando o botão for clicado
    newField.find(".removeFieldBtn").click(function () {
      newField.remove();
    });
  });
});
