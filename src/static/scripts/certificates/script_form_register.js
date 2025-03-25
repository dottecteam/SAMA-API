$(document).ready(function () {
  const ModalLoading = new bootstrap.Modal(
    document.getElementById("loadingModal"),
    {
      backdrop: "static",
      keyboard: false,
    }
  );
  const ModalError = new bootstrap.Modal(document.getElementById("errorModal"))
  const ModalSuccess = new bootstrap.Modal(document.getElementById("successModal"))
  const ModalConfirmacao = new bootstrap.Modal(document.getElementById("modalConfirmacao"), {
    backdrop: "static",
    keyboard: false,
  })

  // Quando a área de upload é clicada, dispara o clique no input file
  $("#file-upload-area").on("click", function () {
    $("#file-form-atestados")[0].click(); // Dispara o clique no input file
  });

  // Quando um arquivo é selecionado via input file
  $("#file-form-atestados").on("change", function (event) {
    var file = event.target.files[0];
    // Verifica se o arquivo tem a extensão .pdf
    if (file && file.name.endsWith(".pdf")) {
      $("#file-upload-area span").text(file.name); // Atualiza o nome do arquivo na área
    } else {
      var myModal = new bootstrap.Modal($("#errorModal"));
      myModal.show();
      $("#error-message").html("Formato de arquivo inválido.");
      $("#file-upload-area span").text(
        "Arraste ou clique para escolher o arquivo"
      ); // Reseta o texto da área
      $("#file-form-atestados").val(""); // Limpa o input file
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

  $("#input-cpf-form-atestados").on("input", function () {
    let cpf = $(this).val().replace(/\D/g, ""); // Remove tudo que não for número

    // Limita a 11 números (CPF sem formatação)
    if (cpf.length > 11) cpf = cpf.substring(0, 11);

    // Formata o CPF: 000.000.000-00
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
    if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (cpf.length > 9)
      cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    $(this).val(cpf);
  });

  //ENVIO DO FORMULÁRIO
  // Quando o formulário é enviado
  $("#form-atestados").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);

    ModalLoading.show();
    $.ajax({
      type: "POST",
      url: "/atestados/cadastro/validar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        ModalLoading.hide();
        if (response.status) {
          $("#email-destino").html(formData.get("input-email-form-atestados"));
          ModalConfirmacao.show();
        } else {
          $("#error-message").html(response.mensagem);
          ModalError.show();
        }
      },
      error: function (xhr, status, error) {
        setTimeout(function() {
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
      url: "/atestados/cadastro/cadastrar",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.status) {
          ModalConfirmacao.hide();
          
          ModalSuccess.show();
          $("#form-confirmacao")[0].reset();
          $("#form-atestados")[0].reset();
          $("#file-upload-area span").text(
            "Arraste ou clique para escolher o arquivo"
          );
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
