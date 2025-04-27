  //Modais
  const ModalLoading = new bootstrap.Modal(
    $("#modal-loading"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  const ModalConfirmacao = new bootstrap.Modal($("#modal-confirmation"), {
    backdrop: "static",
    keyboard: false,
  });
  const ModalError = new bootstrap.Modal($("#modal-error"));
  const ModalSuccess = new bootstrap.Modal($("#modal-success"));
  
$(document).ready(function () {

  //ENVIO DO FORMULÁRIO
  // Validação de email
  $("#form-users").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);

    ModalLoading.show();
    $.ajax({
      type: "POST",
      url: "/usuarios/cadastro/validar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        ModalLoading.hide();
        if (response.status) {
          $("#email-addressee").html(formData.get("input-email-form-users"));
          ModalConfirmacao.show();
        } else {
          $("#error-message").html(response.message);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        setTimeout(function () {
          ModalLoading.hide();
          var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
          var errorMessage = response.message;
          $("#error-message").html(errorMessage);
          ModalError.show();
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
          ModalConfirmacao.hide();
          ModalSuccess.show();
          $("#form-confirmation")[0].reset();
          $("#form-users")[0].reset();

        } else {
          ModalConfirmacao.hide();
          $("#form-confirmation")[0].reset();
          $("#error-message").html(response.message);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        ModalConfirmacao.hide();
        $("#form-confirmation")[0].reset();
        var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
        var errorMessage = response.message;
        $("#error-message").html(errorMessage);
        ModalError.show();
      },
    });
  });
});
