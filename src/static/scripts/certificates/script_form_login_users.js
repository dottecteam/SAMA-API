$(document).ready(function () {
    $('#form-login').submit(function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/usuarios/logar",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status) {
                    window.location.href = "/";
                } else {
                    var myModal = new bootstrap.Modal($('#errorModal'));
                    myModal.show();
                    $('#error-message').html(response.mensagem);
                }
            },
            error: function (xhr, status, error) {
                var myModal = new bootstrap.Modal($('#errorModal'));
                myModal.show();
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.mensagem;
                $('#error-message').html(errorMessage);
            },
        });
    });
});