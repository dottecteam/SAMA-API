

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
