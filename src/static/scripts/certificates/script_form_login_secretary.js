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
    $('#form-login-secretary').submit(function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/atestados/acesso/logar",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status) {
                    window.location.href = "/painel/atestados";
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

function showPassword() {
    var inputPass = document.getElementById("input-password-secretary")
    var BtnMostrarSenha = document.getElementById("show-password")

    if (inputPass.type === "password") {
        inputPass.setAttribute('type', 'text')
        BtnMostrarSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    }
    else {
        inputPass.setAttribute('type', 'password')
        BtnMostrarSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}