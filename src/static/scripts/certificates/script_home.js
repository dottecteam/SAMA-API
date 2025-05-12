//Modais
const ModalError = new bootstrap.Modal($("#modal-error"));
const ModalLogin = new bootstrap.Modal($("#modal-login"));

$(document).ready(function () {
    $('#link-register-certificate').on('click', function(event){
        event.preventDefault();

        $.ajax({
            url: "/usuarios/sessao",
            type: "POST",
            contentType: 'application/json',
            success: function (response) {
                if (response.status) {
                    window.location.href = "/atestados/cadastro";
                } else {
                    ModalLogin.show();
                }
            },
            error: function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.message;
                $("#error-message").html(errorMessage);
                ModalError.show();
            }
        });
    });
});