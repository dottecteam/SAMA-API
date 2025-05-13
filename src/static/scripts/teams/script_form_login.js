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
                    $("#modal-error").modal('show');
                    $('#error-message').html(response.message);
                }
            },
            error: function (xhr, status, error) {
                $("#modal-error").modal('show');
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.message;
                $('#error-message').html(errorMessage);
            },
        });
    });
});