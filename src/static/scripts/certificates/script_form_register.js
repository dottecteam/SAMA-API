

$(document).ready(function () {
  //ENVIO DO FORMULÁRIO
  // Validação de email
  $("#form-users").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);

    $("#modal-loading").modal('show');
    $.ajax({
      type: "POST",
      url: "/usuarios/cadastro/validar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#modal-loading").modal('hide');
        if (response.status) {
          $("#email-addressee").html(formData.get("input-email-form-users"));
          $("#modal-confirmation").modal('show');
        } else {
          $("#error-message").html(response.message);
          $("#modal-error").modal('show');
        }
      },
      error: function (xhr, status, error) {
        setTimeout(function () {
          $("#modal-loading").modal('hide');
          var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
          var errorMessage = response.message;
          $("#error-message").html(errorMessage);
          $("#modal-error").modal('show');
        }, 1000);

      }
    });
  });


  $("#form-confirmation").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "/usuarios/cadastro/cadastrar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.status) {
          $("#modal-confirmation").modal('hide');
          $("#modal-success").modal('show');
          $("#form-confirmation")[0].reset();
          $("#form-users")[0].reset();

        } else {
          $("#modal-confirmation").modal('hide');
          $("#form-confirmation")[0].reset();
          $("#error-message").html(response.message);
          $("#modal-error").modal('show');
        }
      },
      error: function (xhr, status, error) {
        $("#modal-confirmation").modal('hide');
        $("#form-confirmation")[0].reset();
        var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
        var errorMessage = response.message;
        $("#error-message").html(errorMessage);
        $("#modal-error").modal('show');
      },
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const passwordField = document.getElementById('input-password-form-users');
  const toggleButton = document.getElementById('toggle-password-user');
  const passwordIcon = document.getElementById('password-icon-user');

  toggleButton.addEventListener('click', function () {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    passwordIcon.className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const passwordField = document.getElementById('input-confirm-password-form-users');
  const toggleButton = document.getElementById('toggle-confirm-password-user');
  const passwordIcon = document.getElementById('confirm-password-icon');

  toggleButton.addEventListener('click', function () {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    passwordIcon.className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
});

