$(document).ready(function () {
    // Detecta quando a página é rolada
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
            $('.navbar').removeClass('scrolled');
        }
    });

    // Remove a transparência quando o mouse passa por cima
    $('.navbar').hover(
        function () {
            $(this).removeClass('scrolled');
        },
        function () {
            if ($(window).scrollTop() > 50) {
                $(this).addClass('scrolled');
            }
        }
    );

    // Evita alerta no console ao fechar modais
    document.addEventListener('hide.bs.modal', function() {
        document.activeElement.blur();
    });
});