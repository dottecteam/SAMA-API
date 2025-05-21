$(document).ready(function () {
  let fieldCounter = 0; // Contador para gerar IDs únicos

  // Função para adicionar o novo campo
  $("#btn-add-field").click(function (event) {
    event.preventDefault(); // Impede o envio do formulário

    fieldCounter++; // Incrementa o contador

    // Criar o elemento div para o novo campo
    const newField = $(`
                <div class="col-6 mb-3 position-relative">
                    <label for="input-email-form-devteam-${fieldCounter}">Email do Dev:</label>
                    <input type="email" class="form-control"
                           id="input-email-form-devteam-${fieldCounter}" 
                           name="dev_email[]" 
                           placeholder="Email" required />
                    <button type="button" class="btn-remove-field"><span>-</span></button>
                </div>
                
            
        `);

    // Adicionar o novo campo ao contêiner
    $("#dev-fields-container").append(newField);


    // Adicionar a função para remover o campo quando o botão for clicado
    newField.find(".btn-remove-field").click(function () {
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
          $("#modal-success").modal('show');
          $("#form-teams")[0].reset();

        } else {
          $("#error-message").html(response.message);
          $("#modal-error").modal('show');
        }
      },
      error: function (xhr, status, error) {
        var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
        var errorMessage = response.message;
        $("#error-message").html(errorMessage);
        $("#modal-error").modal('show');
      },
    });
  });
});


// Script para alternar visibilidade da senha na página de cadastro
const togglePasswordRegister = document.getElementById('toggle-password-register');
const passwordFieldRegister = document.getElementById('input-password-form');
const passwordIconRegister = document.getElementById('password-icon-register');

togglePasswordRegister.addEventListener('click', function () {
  // Alternar o tipo do campo de senha
  const type = passwordFieldRegister.type === 'password' ? 'text' : 'password';
  passwordFieldRegister.type = type;

  // Alternar o ícone de visibilidade
  passwordIconRegister.classList.toggle('bi-eye');
  passwordIconRegister.classList.toggle('bi-eye-slash');
});
