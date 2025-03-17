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
});