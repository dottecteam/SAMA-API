$(document).ready(function () {
    $('#link-register-certificate').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: "/usuarios/sessao",
            type: "POST",
            contentType: 'application/json',
            success: function (response) {
                if (response.status) {
                    window.location.href = "/atestados/cadastro";
                } else {
                    $('#modal-login').modal('show');
                }
            },
            error: function (xhr, status, error) {
                var response = JSON.parse(xhr.responseText);
                var errorMessage = response.message;
                $("#error-message").html(errorMessage);
                $('#modal-error').modal('show');
            }
        });
    });
});