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
    const ModalLogin = new bootstrap.Modal($("#modal-login"));

    //Abrir modal de login
    $('#btn-login').on('click', function () {
        ModalLogin.show()
    })

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
                    setTimeout(function () {
                        ModalLogin.hide();
                        ModalError.show();
                      }, 200);
                    
                    $('#error-message').html(response.mensagem);
                }
            },
            error: function (xhr, status, error) {
                setTimeout(function () {
                    ModalLogin.hide();
                    ModalError.show();
                  }, 200);
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.mensagem;
                $('#error-message').html(errorMessage);
            },
        });
    });
});