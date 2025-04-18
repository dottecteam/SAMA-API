$(document).ready(function () {
    const ModalLogin = new bootstrap.Modal(document.getElementById("loginModal"));
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

    $('#btn-login').on('click', function (){
        ModalLogin.show()
    })

    $('.modal').each(function () {
        const $modal = $(this);
  
        // Flag pra evitar loop infinito
        let closing = false;
  
        $modal.on('hide.bs.modal', function (e) {
          if (closing) {
            // já estamos no meio de um fechamento programado, deixa passar
            return;
          }
  
          e.preventDefault(); // cancela fechamento automático
  
          $modal.removeClass('show'); // remove show pra iniciar animação de saída
  
          closing = true; // marca que o fechamento está sendo tratado
  
          setTimeout(function () {
            // Chama a função original do Bootstrap pra esconder o modal
            const modalInstance = bootstrap.Modal.getInstance($modal[0]);
            modalInstance.hide(); // isso vai rodar de novo o evento, mas com flag ativado
            closing = false; // libera pro futuro
          }, 200); // tempo da sua animação CSS
        });
      });
});