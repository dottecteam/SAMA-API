$(document).ready(function () {
  //Modais
  const ModalLoading = new bootstrap.Modal(
    document.getElementById("loadingModal"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  const ModalError = new bootstrap.Modal(document.getElementById("errorModal"));
  const ModalSuccess = new bootstrap.Modal(document.getElementById("successModal"));
  const ModalConfirmacao = new bootstrap.Modal(document.getElementById("modalConfirmacao"), {
    backdrop: "static",
    keyboard: false,
  });


  //ENVIO DO FORMULÁRIO
  // validação de email
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
          $("#email-destino").html(formData.get("input-email-form-users"));
          ModalConfirmacao.show();
        } else {
          $("#error-message").html(response.mensagem);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        setTimeout(function () {
          ModalLoading.hide();
          var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
          var errorMessage = response.mensagem;
          $("#error-message").html(errorMessage);
          ModalError.show();
        }, 1000);

      }
    });
  });

  $("#form-confirmacao").on("submit", function (event) {
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
          $("#form-confirmacao")[0].reset();
          $("#form-users")[0].reset();
          // $("#file-upload-area span").text(
          //   "Arraste ou clique para escolher o arquivo"
          // );
        } else {
          ModalConfirmacao.hide();
          $("#form-confirmacao")[0].reset();
          $("#error-message").html(response.mensagem);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        ModalConfirmacao.hide();
        $("#form-confirmacao")[0].reset();

        var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
        var errorMessage = response.mensagem;
        $("#error-message").html(errorMessage);
        ModalError.show();
      },
    });
  });
});
