document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.container-info');
    const sectionIds = ['personal-info', 'security'];

    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Esconde todas as seções
            sections.forEach(section => section.style.display = 'none');

            // Mostra apenas a seção correspondente
            const targetId = sectionIds[index];
            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = 'block';
            }
        });
    });
});

$('#change-password-form').submit(function(event) {
    event.preventDefault();

    var senha_atual = $('#senha_atual').val();
    var nova_senha = $('#nova_senha').val();
    var confirmar_senha = $('#confirmar_senha').val();

    $.ajax({
        url: '/usuarios/alterar_senha',
        type: 'POST',
        data: {
            senha_atual: senha_atual,
            nova_senha: nova_senha,
            confirmar_senha: confirmar_senha
        },
        success: function(response) {
            if (response.success === false) {
                $('#error-msg').text('Erro! ' + response.mensagem + '!');
                $('#error-msg').css('display', 'block');
                setTimeout(function () {
                    $('#error-msg').css('display', 'none');
                }, 3000);
            } else {
                $('#change-password-form').css('display', 'none');
                $('#success-msg').text(response.mensagem);
                $('#success-msg').css('display', 'block');
            }
        }
    });
});