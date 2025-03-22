$(document).ready(function () {
    // Detecta quando a página é rolada
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled'); // Aplica a transição de opacidade
        } else {
            $('.navbar').removeClass('scrolled'); // Restaura a opacidade para 1 suavemente
        }
    });

    // Remove a transparência quando o mouse passa por cima
    $('.navbar').hover(
        function () {
            $(this).removeClass('scrolled'); // Remove a transparência ao passar o mouse
        },
        function () {
            if ($(window).scrollTop() > 50) {
                $(this).addClass('scrolled'); // Restaura a transparência ao sair o mouse
            }
        }
    );

    $('#form-search-atestados input').on('input', function () {
        let cpf = $(this).val().replace(/\D/g, ''); // Remove tudo que não for número
        
         // Limita a 11 números (CPF sem formatação)
         if (cpf.length > 11) cpf = cpf.substring(0, 11);

        // Formata o CPF: 000.000.000-00
        if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
        if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

        $(this).val(cpf);
    });
});