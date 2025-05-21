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

// Script para alternar visibilidade da senha
const togglePassword = document.getElementById('toggle-password');
const passwordField = document.getElementById('input-password-team');
const passwordIcon = document.getElementById('password-icon');

togglePassword.addEventListener('click', function () {
  // Alternar o tipo do campo de senha
  const type = passwordField.type === 'password' ? 'text' : 'password';
  passwordField.type = type;

  // Alternar o ícone de visibilidade
  passwordIcon.classList.toggle('bi-eye');
  passwordIcon.classList.toggle('bi-eye-slash');
});
