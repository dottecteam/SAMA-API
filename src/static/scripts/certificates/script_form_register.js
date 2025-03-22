$(document).ready(function() {
    // Quando a área de upload é clicada, dispara o clique no input file
    $('#file-upload-area').on('click', function() {
        $('#file-form-atestados')[0].click();  // Dispara o clique no input file
    });

    // Quando um arquivo é selecionado via input file
    $('#file-form-atestados').on('change', function(event) {
        var file = event.target.files[0];
        // Verifica se o arquivo tem a extensão .pdf
        if (file && file.name.endsWith('.pdf')) {
            $('#file-upload-area span').text(file.name);  // Atualiza o nome do arquivo na área
        } else {
            var myModal = new bootstrap.Modal($('#errorModal'));
            myModal.show();
            $('#error-message').html('Formato de arquivo inválido.')
            $('#file-upload-area span').text('Arraste ou clique para escolher o arquivo');  // Reseta o texto da área
            $('#file-form-atestados').val('');  // Limpa o input file
        }
    });

    // Quando o arquivo é arrastado sobre a área, adicione a classe "dragover"
    $('#file-upload-area').on('dragover', function(event) {
        event.preventDefault();  // Impede o comportamento padrão (impede que o arquivo seja aberto no navegador)
        $(this).addClass('dragover');  // Adiciona a classe para mudar o fundo quando o arquivo estiver sobre a área
    });

    // Quando o arquivo é arrastado para fora da área, remova a classe "dragover"
    $('#file-upload-area').on('dragleave', function(event) {
        $(this).removeClass('dragover');  // Remove a classe "dragover" quando o arquivo sai da área
    });

    // Quando o arquivo é solto na área
    $('#file-upload-area').on('drop', function(event) {
        event.preventDefault();  // Impede o comportamento padrão (impede que o arquivo seja aberto no navegador)
        $(this).removeClass('dragover');  // Remove a classe "dragover" após o arquivo ser solto

        var file = event.originalEvent.dataTransfer.files[0];  // Obtém o arquivo que foi arrastado
        // Verifica se o arquivo tem a extensão .pdf
        if (file && file.name.endsWith('.pdf')) {
            $('#file-upload-area span').text(file.name);  // Atualiza o nome do arquivo na área
            // Se quiser processar o arquivo aqui, como enviá-lo para o servidor, pode adicionar essa lógica
        } else {
            var myModal = new bootstrap.Modal($('#errorModal'));
            myModal.show();
            $('#error-message').html('Formato de arquivo inválido.')
            $('#file-upload-area span').text('Arraste ou clique para escolher o arquivo');  // Reseta o texto da área
        }
    });

    // Quando o formulário é enviado
    $('#form-atestados').on('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: '/atestados/cadastro/cadastrar',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.status) {
                    var myModal = new bootstrap.Modal($('#successModal'));
                    myModal.show();
                    $('#form-atestados')[0].reset();
                    $('#file-upload-area span').text('Arraste ou clique para escolher o arquivo');
                } else {
                    var myModal = new bootstrap.Modal($('#errorModal'));
                    myModal.show();
                    $('#error-message').html(response.mensagem);
                }
            },
            error: function(xhr, status, error) {
                var myModal = new bootstrap.Modal($('#errorModal'));
                myModal.show();
                var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
                var errorMessage = response.mensagem;
                $('#error-message').html(errorMessage);
            },
        });
    });


    $('#input-cpf-form-atestados').on('input', function () {
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
