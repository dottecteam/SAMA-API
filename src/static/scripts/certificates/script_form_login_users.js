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
                    $("#modal-login").modal('hide');
                    $("#modal-error").modal('show');

                    $('#error-message').html(response.message);
                }
            },
            error: function (xhr, status, error) {
                console.log(response)
                setTimeout(function () {
                    $("#modal-login").modal('hide');
                    $("#modal-error").modal('show');
                }, 200);sta
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.message;
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
