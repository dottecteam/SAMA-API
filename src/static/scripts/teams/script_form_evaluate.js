function UpdateEvaluation(input, output) {
    $(`[id="${output}"]`).val($(`[id="${input}"]`).val());
};


$('#form-avaliacao').submit(function (event) {
    event.preventDefault();
    let form = this;
    let evaluations = new FormData(form);
    $.ajax({
        type: 'POST',
        url: '/equipes/avaliacoes/avaliar',
        data: evaluations,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.status) {
                $("#modal-success").modal('show');
                $('#success-message').html(response.message);
            } else {
                $("#modal-error").modal('show');
                $('#error-message').html(response.message);
            }
        },
        error: function (xhr, status, error) {
            $("#modal-error").modal('show');
            var response = JSON.parse(xhr.responseText); // Tenta analisar a resposta como JSON
            var errorMessage = response.message;
            $('#error-message').html(errorMessage);
        },
    })
});