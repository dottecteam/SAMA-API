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
                    setTimeout(function () {
                        $("#modal-login").modal('hide');
                        $("#modal-error").modal('show');
                    }, 200);

                    $('#error-message').html(response.mensagem);
                }
            },
            error: function (xhr, status, error) {
                setTimeout(function () {
                    $("#modal-login").modal('hide');
                    $("#modal-error").modal('show');
                }, 200);
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.mensagem;
                $('#error-message').html(errorMessage);
            },
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const passwordField = document.getElementById('input-password-form-login');
  const toggleButton = document.getElementById('toggle-password-login');
  const passwordIcon = document.getElementById('password-icon');

  toggleButton.addEventListener('click', function () {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    passwordIcon.className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
});
