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
    // Formulário de acesso
    $('#form-login-team').submit(function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/equipes/acesso/logar",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status) {
                    window.location.href = "/painel/equipes";
                } else {
                    ModalError.show()
                    $('#error-message').html(response.message);
                }
            },
            error: function (xhr, status, error) {
                ModalError.show()
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.message;
                $('#error-message').html(errorMessage);
            },
        });
    });
});