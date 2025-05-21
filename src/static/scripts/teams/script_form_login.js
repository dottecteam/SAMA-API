$(document).ready(function () {
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
            error: function (xhr) {
                $("#modal-error").modal('show');
                try {
                    let response = JSON.parse(xhr.responseText);
                    $('#error-message').html(response.message);
                } catch (e) {
                    $('#error-message').html("Erro inesperado. Tente novamente.");
                }
            },
        });
    });

    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('input-password-team');
    const passwordIcon = document.getElementById('password-icon');

    if (togglePassword && passwordField && passwordIcon) {
        togglePassword.addEventListener('click', function () {
            const isPassword = passwordField.type === 'password';
            passwordField.type = isPassword ? 'text' : 'password';

            passwordIcon.classList.toggle('bi-eye', isPassword);         // mostra 'olho aberto' quando visível
            passwordIcon.classList.toggle('bi-eye-slash', !isPassword);  // mostra 'olho fechado' quando oculto

        });
    }
});
