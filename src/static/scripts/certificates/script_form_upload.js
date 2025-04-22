$(document).ready(function () {
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

  // Quando a área de upload é clicada, dispara o clique no input file
  $("#file-upload-area").on("click", function () {
    $("#file-form-certificates")[0].click(); // Dispara o clique no input file
  });

  // Quando um arquivo é selecionado via input file
  $("#file-form-certificates").on("change", function (event) {
    var file = event.target.files[0];
    // Verifica se o arquivo tem a extensão .pdf
    if (file && file.name.endsWith(".pdf")) {
      $("#file-upload-area span").text(file.name); // Atualiza o nome do arquivo na área
    } else {
      ModalError.show();
      $("#error-message").html("Formato de arquivo inválido.");
      $("#file-upload-area span").text(
        "Arraste ou clique para escolher o arquivo"
      ); // Reseta o texto da área
      $("#file-form-certificates").val(""); // Limpa o input file
    }
  });

  // Quando o arquivo é arrastado sobre a área, adicione a classe "dragover"
  $("#file-upload-area").on("dragover", function (event) {
    event.preventDefault(); // Impede o comportamento padrão (impede que o arquivo seja aberto no navegador)
    $(this).addClass("dragover"); // Adiciona a classe para mudar o fundo quando o arquivo estiver sobre a área
  });

  // Quando o arquivo é arrastado para fora da área, remova a classe "dragover"
  $("#file-upload-area").on("dragleave", function (event) {
    $(this).removeClass("dragover"); // Remove a classe "dragover" quando o arquivo sai da área
  });

  // Quando o arquivo é solto na área
  $("#file-upload-area").on("drop", function (event) {
    event.preventDefault(); // Impede o comportamento padrão (impede que o arquivo seja aberto no navegador)
    $(this).removeClass("dragover"); // Remove a classe "dragover" após o arquivo ser solto

    var file = event.originalEvent.dataTransfer.files[0]; // Obtém o arquivo que foi arrastado
    // Verifica se o arquivo tem a extensão .pdf
    if (file && file.name.endsWith(".pdf")) {
      $("#file-upload-area span").text(file.name); // Atualiza o nome do arquivo na área
      // Se quiser processar o arquivo aqui, como enviá-lo para o servidor, pode adicionar essa lógica
    } else {
      ModalError.show();
      $("#error-message").html("Formato de arquivo inválido.");
      $("#file-upload-area span").text(
        "Arraste ou clique para escolher o arquivo"
      ); // Reseta o texto da área
    }
  });

  $("#form-certificates").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);

    ModalLoading.show();
    $.ajax({
      type: "POST",
      url: "/atestados/cadastro/cadastrar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        setTimeout(function () {
          ModalLoading.hide();
          if (response.status) {
            ModalSuccess.show();
            $("#form-certificates")[0].reset();
            $("#file-upload-area span").text(
              "Arraste ou clique para escolher o arquivo"
            );
          } else {
            $("#error-message").html(response.message);
            ModalError.show();
          }
        }, 1000);
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
});