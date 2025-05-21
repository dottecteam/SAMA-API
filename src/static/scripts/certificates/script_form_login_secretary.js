$(document).ready(function () {
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
                    $("#modal-error").modal('show');
                    $('#error-message').html(response.message);
                }
            },
            error: function (xhr, status, error) {
                $("#modal-error").modal('show');
                var response = JSON.parse(xhr.responseText);
                var errorMessage = response.message;
                $('#error-message').html(errorMessage);
            },
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const passwordField = document.getElementById('input-password-secretary');
  const toggleButton = document.getElementById('toggle-password');
  const passwordIcon = document.getElementById('password-icon');

  toggleButton.addEventListener('click', function () {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    passwordIcon.className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
});
