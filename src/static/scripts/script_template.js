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

    

    //Fechar modais com animação
    $('.modal').each(function () {
        const $modal = $(this);
        let closing = false;
  
        $modal.on('hide.bs.modal', function (e) {
          if (closing) {
            return;
          }
  
          e.preventDefault();

          $modal.removeClass('show');
          closing = true;
  
          setTimeout(function () {
            const modalInstance = bootstrap.Modal.getInstance($modal[0]);
            modalInstance.hide();
            closing = false;
          }, 200);
        });
      });
});