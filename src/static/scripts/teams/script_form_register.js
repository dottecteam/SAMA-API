  //Modais
  const ModalLoading = new bootstrap.Modal(
    $("#modal-loading"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  const ModalError = new bootstrap.Modal($("#modal-error"));
  const ModalSuccess = new bootstrap.Modal($("#modal-success"));

$(document).ready(function () {
  let fieldCounter = 0; // Contador para gerar IDs únicos

  // Função para adicionar o novo campo
  $("#addFieldBtn").click(function (event) {
    console.log('a');
    event.preventDefault(); // Impede o envio do formulário

    fieldCounter++; // Incrementa o contador

    // Criar o elemento div para o novo campo
    const newField = $(`
            <div class="row form-group p-2">
                <div class="col-md-6">
                    <label for="input-nome-form-devteam-${fieldCounter}">Nome do Dev:</label>
                    <input type="text" class="form-control"
                           id="input-nome-form-devteam-${fieldCounter}" 
                           name="dev_name[]" 
                           placeholder="Nome" required />
                </div>
                <div class="col-md-6">
                    <label for="input-email-form-devteam-${fieldCounter}">Email do Dev:</label>
                    <input type="email" class="form-control"
                           id="input-email-form-devteam-${fieldCounter}" 
                           name="dev_email[]" 
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

  $('#form-teams').on('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      type: "POST",
      url: "/equipes/cadastro/cadastrar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.status) {
          ModalSuccess.show();
          $("#form-teams")[0].reset();

        } else {
          $("#error-message").html(response.message);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
        var errorMessage = response.message;
        $("#error-message").html(errorMessage);
        ModalError.show();
      },
    });
  });
});
