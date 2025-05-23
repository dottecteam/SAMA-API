function checkCarouselButtons() {
    const $carousel = $('#teamCarousel');
    const $btnLeft = $('#btnLeft');
    const $btnRight = $('#btnRight');

    // Acessa DOM nativo com [0] para pegar scrollWidth
    const scrollWidth = $carousel[0].scrollWidth;
    const clientWidth = $carousel[0].clientWidth;

    if (scrollWidth <= clientWidth) {
        $btnLeft.hide();
        $btnRight.hide();
    } else {
        $btnLeft.show();
        $btnRight.show();
    }
}

function scrollCarousel(direction) {
    const $carousel = $('#teamCarousel');
    const scrollAmount = $carousel.outerWidth() * 0.8;

    $carousel.animate({
        scrollLeft: $carousel.scrollLeft() + direction * scrollAmount
    }, 400);
}

// Garante execução após renderização completa
$(window).on('load resize', function () {
    checkCarouselButtons();
});